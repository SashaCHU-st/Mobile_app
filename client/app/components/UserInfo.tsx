import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Me } from "../types/types";
import dog from "../../assets/images/dog.jpg";
import { size } from "../utils/size";

const UserInfo: React.FC<Me> = ({ id, name, email, image }) => {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push("/editProfile/EditProfile");
  };
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
      <Text style={styles.text}>Name :{name}</Text>
      <Text style={styles.text}>Email :{email}</Text>
      <View>
        <Pressable style={styles.button} onPress={() => handleEditProfile()}>
          <Text>Edit Profile</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  text: {
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
  button: {
    width: 120,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#7A85C1",
    justifyContent: "center",
    alignItems: "center",
  },
});
