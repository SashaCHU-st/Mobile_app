import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import {Me} from "../types/types"

const UserInfo: React.FC<Me> = ({id, name, email, password}) => {
  return (
    <View>
        <Text style={styles.text}>
            Id :{id}
        </Text>
        <Text style={styles.text}>
            Name :{name}
        </Text>
        <Text style={styles.text}>
            Email :{email}
        </Text>
        <Text style={styles.text}>
            Password :{password}
        </Text>
    </View>
  )
}

export default UserInfo

const styles = StyleSheet.create({
  text: {
    top: 50,
    left: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    zIndex: 10, 
  },
});
