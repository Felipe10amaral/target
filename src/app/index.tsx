import { Button, Text, View } from "react-native";
import { router } from "expo-router";

export default function Index() {
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Hello World  </Text>

            <Button title="Ir para Target" onPress={() => { router.push('/target') }} />
            <Button title="Transação" onPress={() => router.navigate("/transaction/1")}  />

            <Button title="Progresso"onPress={() => router.navigate('/in-progress/12')}
      />
        </View>
    )

}