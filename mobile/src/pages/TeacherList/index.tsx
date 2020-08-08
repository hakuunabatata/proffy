import React, { useState } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TecherItem";
import api from "../../services/api";
import styles from "./styles";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  bio: string;
  cost: number;
  avatar: string;
  zipzorp: string;
}

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [visibleFilters, setVisibleFilters] = useState(false);
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((res) => {
      if (res) {
        const favortitedTeachers = JSON.parse(res);
        const favortitedTeachersIds = favortitedTeachers.map(
          (teacher: Teacher) => teacher.id
        );

        setFavorites(favortitedTeachersIds);
      }
    });
  }

  async function handleFiltersSubmit() {
    loadFavorites();

    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);

    setVisibleFilters(false);
  }

  return (
    <View style={styles.container}>
      <PageHeader title="Proffys Disponiveis">
        {!visibleFilters ? (
          <View>
            <BorderlessButton
              style={styles.submitButton}
              onPress={() => setVisibleFilters(true)}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </BorderlessButton>
          </View>
        ) : (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Materia</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholder="Qual a materia?"
              placeholderTextColor="#c1bccc"
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da Semana</Text>
                <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={(text) => setWeekDay(text)}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horario</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  placeholder="Qual o horario?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>
            <RectButton
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
