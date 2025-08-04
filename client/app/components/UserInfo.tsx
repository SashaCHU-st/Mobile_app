import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import { Me } from "../types/types";
import dog from "../../assets/images/dog.jpg";

const UserInfo: React.FC<Me> = ({ id, name, email, image }) => {
  return (
    <View style={styles.container}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.userImage}
          resizeMode="cover"
        />
      ) : (
        <Image source={dog} style={styles.userImage} resizeMode="cover" />
      )}
      <Text style={styles.text}>Id :{id}</Text>
      <Text style={styles.text}>Name :{name}</Text>
      <Text style={styles.text}>Email :{email}</Text>
      {/* <Text style={styles.text}>Password :{password}</Text> */}
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  text: {
    top: 50,
    left: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    zIndex: 10,
  },
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 75,
    alignSelf: "center",
    marginVertical: 20,
  },
});
