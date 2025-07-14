import {
  View,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import { API_URL } from "../config";


export default function Auth() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);

  return (
    <View style={styles.container}>
      {login ? (
        <>
          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            login = {login}
            setLogin={setLogin}/>
        </>
      ) : (
        <>
          <SignUp
            email={email}
            setEmail={setEmail}
            name={name}
            setName={setName}
            password={password}
            setPassword={setPassword}
            login = {login}
            setLogin={setLogin}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: "center",
  }
});
