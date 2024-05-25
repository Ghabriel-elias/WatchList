import { View } from "react-native";

export const ShowsDetails = ({route}: any) => {

  console.log(route?.params);

  return (
    <View style={{backgroundColor: 'blue', flex: 1}}>
    </View>
  )
}