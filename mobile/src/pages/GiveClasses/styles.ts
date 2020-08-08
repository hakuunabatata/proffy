import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import fonts from "../../utils/fonts";

const { PrimaryRegular, PrimaryBold, Bold } = fonts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#8257e5",
    padding: 40,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontFamily: Bold,
    color: "#fff",
    fontSize: 32,
    lineHeight: 37,
    maxWidth: 180,
  },

  description: {
    marginTop: 24,
    color: "#d4c2ff",
    fontSize: 16,
    lineHeight: 26,
    fontFamily: PrimaryRegular,
    maxWidth: 240,
  },

  OKButton: {
    marginVertical: 40,
    backgroundColor: "#04d361",
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  OKButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Bold,
  },
});

export default styles;
