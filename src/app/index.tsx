import { Alert, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { HomeHeader, HomeHeaderProps } from "@/components/HomeHeader";
import { Target, TargetProps } from "@/components/Target";
import { List } from "@/components/List";
import {Button} from '@/components/Button'
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useCallback, useState } from "react";
import Loading from "@/components/Loading";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";


export default function Index() {
    const [targets, setTargets] = useState<TargetProps[]>([])
    const [isFetching, setIsFetching] = useState(true)
    const [summary, setSumary] = useState<HomeHeaderProps>()

    const targetDataBase = useTargetDatabase();
    const transactions = useTransactionsDatabase()


    async function loadTargets(): Promise<TargetProps[]> {
        try {
            const response = await targetDataBase.listBySavedValue() 
            
            return response.map((item) => ({
                id: String(item.id),
                name: item.name,
                current: numberToCurrency(item.current),
                percentage: item.percentage.toFixed(0) + '%',
                target: numberToCurrency(item.amount)

            }))
            
        } catch (error) {
            
            Alert.alert("Erro","Não foi possível carregar as metas")
        }
    }

    async function fetchSummary(): Promise<HomeHeaderProps> {
        try {
            const response = await transactions.summary()

            return {
                total: numberToCurrency(response.input + response.output),
                input: {
                    label: 'Entrada',
                    value: numberToCurrency(response.input)
                },
                output: {
                    label: 'Saída',
                    value: numberToCurrency(response.output)
                }
            }
        } catch (error) {
            Alert.alert("Erro","Não foi possível carregar o resumo")
            console.log(error)
        }
    }

    async function fetchData() {
        const targetsDataPromise = loadTargets()
        const summaryDataPromise = fetchSummary()
        
        const [targetData, summaryData] = await Promise.all([targetsDataPromise, summaryDataPromise])


        setTargets(targetData)
        setIsFetching(false)
        setSumary(summaryData)

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