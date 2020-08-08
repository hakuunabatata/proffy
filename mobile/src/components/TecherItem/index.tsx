import React, { useState } from "react";
import { View, Image, Text, Linking } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import zipZorpIcon from "../../assets/images/icons/whatsapp.png";
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png";

import styles from "./styles";
import api from "../../services/api";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  bio: string;
  cost: number;
  avatar: string;
  zipzorp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const { id, name, subject, bio, cost, avatar, zipzorp } = teacher;

  const [isFavorited, setFavorited] = useState(favorited);

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem("favorites");
    let favoritesArray = [];
    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex(
        (teacherItem: Teacher) => teacherItem.id === teacher.id
      );
      favoritesArray.splice(favoriteIndex, 1);
      setFavorited(false);
    } else {
      favoritesArray.push(teacher);
      setFavorited(true);
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
  }

  function handleLinkToZipzorp() {
    api.post("connections"),
      {
        user_id: id,
      };
    Linking.openURL(`whatsapp://send?phone=${zipzorp}`);
  }

  return (
    <View key={id} style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri: avatar,
          }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subject}>{subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {"     "}
          <Text style={styles.priceValue}>R$ {cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[styles.favoriteButton, isFavorited && styles.favorited]}
            onPress={handleToggleFavorite}
          >
            {!isFavorited ? (
              <Image source={heartOutlineIcon} />
            ) : (
              <Image source={unfavoriteIcon} />
            )}
          </RectButton>
          <RectButton
            onPress={handleLinkToZipzorp}
            style={styles.contactButton}
          >
            <Image source={zipZorpIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
