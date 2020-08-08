import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import api from "../../services/api";

import styles from "./styles";

import landingImg from "../../assets/images/landing.png";
import studyImg from "../../assets/images/icons/study.png";
import giveClassesImg from "../../assets/images/icons/give-classes.png";
import heartIcon from "../../assets/images/icons/heart.png";

function Landing() {
  const navigation = useNavigation();
  const [totalConnections, setTotalConnection] = useState(0);

  useEffect(() => {
    api.get("connections").then((res) => {
      setTotalConnection(res.data.total);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />
      <Text style={styles.title}>
        Seja bem vindo, {`\n`}
        <Text style={styles.titleBold}> O que deseja fazer </Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          style={[styles.button, styles.buttonPrimary]}
          onPress={() => navigation.navigate("Study")}
        >
          <Image source={studyImg} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>
        <RectButton
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => navigation.navigate("GiveClasses")}
        >
          <Image source={giveClassesImg} />
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas{" "}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
}

export default Landing;
