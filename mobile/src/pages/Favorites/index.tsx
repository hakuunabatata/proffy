import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TecherItem";

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

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((res) => {
      if (res) {
        const favortitedTeachers = JSON.parse(res);

        setFavorites(favortitedTeachers);
      }
    });
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys Favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
      >
        {favorites.map((favorite: Teacher) => (
          <TeacherItem key={favorite.id} favorited={true} teacher={favorite} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Favorites;
