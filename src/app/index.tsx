import { Button, Text, View } from "react-native";
import { router } from "expo-router";
import { HomeHeader } from "@/components/HomeHeader";
import { Target } from "@/components/Target";

const summary = {
    total: "R$ 1000,00",
    input: { label: 'Entradas', value: 'R$ 17.400,00' },
    output: { label: 'Saídas', value: '- R$ 1.400,00' }
}

const targets = [
    {
        name: 'Meta de Viagem',
        percentage: '20%',
        current: 'R$ 3.400,00',
        target: 'R$ 17.000,00'
    }
]

export default function Index() {
    return (
        <View style={{flex:1}}>
            <HomeHeader data={ summary } />
      
            <Target 
                data={targets[0]}
            />
        </View>
    )

}