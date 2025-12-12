import { Button } from "@/components/Button";
import { List } from "@/components/List";
import Loading from "@/components/Loading";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transactions, TransactionsProps } from "@/components/Transactions";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { TransactionTypes } from "@/utils/transactionsTypes";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, View } from "react-native";


const transactions: TransactionsProps[] = [
    {
        id: '1',
        value: 'R$200,00',
        date: "12/12/2025",
        description: "CDB de 115% do banco Inter", 
        type: TransactionTypes.Input,  
    },

    {
        id: '2',
        value: 'R$60,00',
        date: "12/12/2025",
        description: "beca da formatura", 
        type: TransactionTypes.Output,  
    }
]

export default function InProgress() {
    const params = useLocalSearchParams<{ id: string }>()
    const targetDataBase = useTargetDatabase()
    const [isFetching, setIsFetching] = useState(true)
    const [details, setDetails] = useState({
        name: '',
        current: 'R$ 0,00',
        target: 'R$ 0,00',
        percentage: 0,
    })

    async function fetchTargetDetails() {
        try {
            const response = await targetDataBase.getListOne(Number(params.id))
            
            setDetails({
                name: response.name,
                current: numberToCurrency(response.current),
                target: numberToCurrency(response.amount),
                percentage: response.percentage
            })
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.")
            console.log(error)
        }
    }

    async function fecthData() {
        const fetchDetailsPromise = fetchTargetDetails()

        await Promise.all([fetchDetailsPromise])
        setIsFetching(false)
    }

    useFocusEffect(
        useCallback(() => {
            fecthData()
        },[])
    )

    if(isFetching) {
        return <Loading />
    }

    return (
        <View style={{ flex: 1, padding: 24, gap: 32 }}>
            <PageHeader 
                title={details.name}
                rightButton={{
                    icon: 'edit',
                    onPress: () => {}
                }}
            />

            <Progress data={details} />

            <List 
                data={transactions}
                title="Transações"
                renderItem={({item}) => <Transactions data={item} onRemove={() => {}} />}
                
                emptyMessage="Nenhuma transação cadastrada"
            />

            <Button 
                title="Nova transação"
                onPress={() => router.navigate(`/transaction/${params.id}`)}
            />
        </View>
    )
}