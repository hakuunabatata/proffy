import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground, View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import giveClassesBgImg from "../../assets/images/give-classes-background.png";

import styles from "./styles";

function GiveClasses() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={giveClassesBgImg}
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proffy ?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar na nossa plataforma web.
        </Text>
      </ImageBackground>
      <RectButton
        style={styles.OKButton}
        onPress={() => navigation.navigate("Landing")}
      >
        <Text style={styles.OKButtonText}>Tudo Bem</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;
