export default function convertTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);

  return 60 * hour + minute;
}
