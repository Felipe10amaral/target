import { Alert, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { HomeHeader } from "@/components/HomeHeader";
import { Target } from "@/components/Target";
import { List } from "@/components/List";
import {Button} from '@/components/Button'
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useCallback } from "react";

const summary = {
    total: "R$ 1000,00",
    input: { label: 'Entradas', value: 'R$ 17.400,00' },
    output: { label: 'Saídas', value: '- R$ 1.400,00' }
}

const targets = [
    {
        id: '1',
        name: 'Meta de Viagem',
        percentage: '20%',
        current: 'R$ 3.400,00',
        target: 'R$ 17.000,00'
    },
    {
        id: '2',
        name: 'Apple Watch',
        percentage: '20%',
        current: 'R$ 400,00',
        target: 'R$ 2.000,00'
    },
    {
        id: '3',
        name: 'Carro Novo',
        percentage: '20%',
        current: 'R$ 3.400,00',
        target: 'R$ 30.000,00'
    }
]

export default function Index() {
    const targetDataBase = useTargetDatabase();
    console.log(targetDataBase)

    async function loadTargets() {
        try {
            const response = await targetDataBase.listBySavedValue() 
            console.log(response)
            
        } catch (error) {
            console.log(error)
            Alert.alert("Erro","Não foi possível carregar as metas")
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadTargets()
        },[])
    )
    
    return (
        <View style={{flex:1}}>
            <HomeHeader data={ summary } />
            <List 
                data={targets} 
                renderItem={({ item }) => (
                    <Target data={item} onPress={() => router.navigate(`/in-progress/${item.id}`)}/>
                )}
                title="Metas"
                keyExtractor={(item) => item.id   }
                containerStyle={{ paddingHorizontal: 24}}
            />

            <View style={{ padding: 24, paddingBottom: 32 }}>
                <Button title="Nova meta" onPress={() => router.navigate("/target")} />
            </View>
        </View>
    )


}