import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/Helpers/Header";

const Intro = () => {
  const router = useRouter();
  const moveToHomePage = () => {
    router.push("/screens/Home");
  };

  return (
    <View>
      <Header />
      <View style={styles.intro}>
        <Text style={styles.heading}>
          Hi, my name is Aleksandra! Let's start the journey through my app.
        </Text>
        <Text style={styles.text}>
          This application is built with React Native, TypeScript, Node.js
          (Fastify), and uses PostgreSQL with NEON as storage. It's deployed on
          Vercel and Render.
        </Text>
        <Text style={styles.text}>
          You can search for friends, add or remove them, and connect with
          others.
        </Text>
        <Text style={styles.text}>
          Discover recipes based on your preferences and dietary requirements.
        </Text>
        <Text style={styles.text}>
          Save your favorite recipes and share them with friends.
        </Text>
        <Text style={styles.text}>
          Leave comments on recipes for your friends to see and interact with.
        </Text>
        <Text style={styles.text}>Check out the demo video here: xxxx</Text>
      </View>

      <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => moveToHomePage()}>
          <Text style={styles.buttonText}>Let's start</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Intro;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#7A85C1",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  intro: {
    backgroundColor: "#f8f9fa",
    padding: 5,
    margin: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 8,
  },
});
