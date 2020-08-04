import { Request, Response } from "express";

import db from "../database/connection";
import convertTime from "../utils/convertTime";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

interface Filter {
  subject?: string;
  time?: string;
  week_day?: string;
}

export default class ClassesController {
  async index(req: Request, res: Response) {
    const filters: Filter = req.query;

    if (!filters.subject || !filters.week_day || !filters.time) {
      return res.status(400).json({
        error: "Missing filters to search classes",
      });
    }

    const timeInMinutes = convertTime(filters.time);

    const classes = await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
          .whereRaw("`class_schedule`.`week_day` = ??", [
            Number(filters.week_day),
          ])
          .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes])
          .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]);
      })
      .where("classes.subject", "=", filters.subject)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);

    return res.json(classes);
  }

  async create(req: Request, res: Response) {
    const { name, avatar, zipzorp, bio, subject, cost, schedule } = req.body;

    const trx = await db.transaction();

    try {
      const insertedUserId = await trx("users").insert({
        name,
        avatar,
        zipzorp,
        bio,
      });

      const user_id = insertedUserId[0];

      const insertedClassId = await trx("classes").insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassId[0];

      const classSchedule = schedule.map((item: ScheduleItem) => {
        const { week_day, from, to } = item;

        return {
          class_id,
          week_day,
          from: convertTime(from),
          to: convertTime(to),
        };
      });

      await trx("class_schedule").insert(classSchedule);

      await trx.commit();

      return res.status(201).send();
    } catch (err) {
      await trx.rollback();

      return res.status(400).json({
        error: "Unexpected error while creating new class",
      });
    }
  }
}
