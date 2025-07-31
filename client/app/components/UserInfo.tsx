import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import {Me} from "../types/types"

const UserInfo: React.FC<Me> = ({id, name, email, password}) => {
  return (
    <View>
        <Text>
            Id :{id}
        </Text>
        <Text>
            Name :{name}
        </Text>
        <Text>
            Email :{email}
        </Text>
        <Text>
            Password :{password}
        </Text>
    </View>
  )
}

export default UserInfo