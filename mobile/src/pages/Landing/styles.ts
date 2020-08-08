import { StyleSheet } from "react-native";
import fonts from "../../utils/fonts";

const { PrimaryRegular, PrimaryBold, Bold } = fonts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#8257e5",
    padding: 40,
  },
  banner: {
    width: "100%",
    resizeMode: "contain",
  },
  title: {
    fontFamily: PrimaryRegular,
    color: "#fff",
    fontSize: 20,
    lineHeight: 30,
    marginTop: 80,
  },
  titleBold: {
    fontFamily: PrimaryBold,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "space-between",
  },

  button: {
    height: 150,
    width: "48%",
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 24,
    justifyContent: "space-between",
  },
  buttonPrimary: {
    backgroundColor: "#9871f5",
  },
  buttonSecondary: {
    backgroundColor: "#04d361",
  },
  buttonText: {
    fontFamily: Bold,
    color: "#fff",
    fontSize: 20,
  },
  totalConnections: {
    fontFamily: PrimaryRegular,
    color: "#d4c2ff",
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 200,
    marginTop: 40,
  },
});

export default styles;
