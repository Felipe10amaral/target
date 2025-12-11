import { Alert, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { HomeHeader } from "@/components/HomeHeader";
import { Target, TargetProps } from "@/components/Target";
import { List } from "@/components/List";
import {Button} from '@/components/Button'
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useCallback, useState } from "react";
import Loading from "@/components/Loading";

const summary = {
    total: "R$ 1000,00",
    input: { label: 'Entradas', value: 'R$ 17.400,00' },
    output: { label: 'Saídas', value: '- R$ 1.400,00' }
}



export default function Index() {
    const [targets, setTargets] = useState<TargetProps[]>([])
    const [isFetching, setIsFetching] = useState(true)

    const targetDataBase = useTargetDatabase();
    console.log(targetDataBase)

    async function loadTargets(): Promise<TargetProps[]> {
        try {
            const response = await targetDataBase.listBySavedValue() 
            
            return response.map((item) => ({
                id: String(item.id),
                name: item.name,
                current: String(item.current),
                percentage: item.percentage.toFixed(0) + '%',
                target: String(item.amount)

            }))
            
        } catch (error) {
            console.log(error)
            Alert.alert("Erro","Não foi possível carregar as metas")
        }
    }

    async function fetchData() {
        const targetsDataPromise = loadTargets()
        const [targetData] = await Promise.all([targetsDataPromise])
        setTargets(targetData)
        setIsFetching(false)

    }

    useFocusEffect(
        useCallback(() => {
            fetchData()
        },[])
    )

    if(isFetching){
        return <Loading />
    }
    
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