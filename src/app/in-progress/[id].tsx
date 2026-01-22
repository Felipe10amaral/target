import { Button } from "@/components/Button";
import { List } from "@/components/List";
import Loading from "@/components/Loading";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transactions, TransactionsProps } from "@/components/Transactions";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useTransactionsDatabase } from '@/database/useTransactionsDatabase'
import { numberToCurrency } from "@/utils/numberToCurrency";
import { TransactionTypes } from "@/utils/transactionsTypes";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, View } from "react-native";



export default function InProgress() {
    const params = useLocalSearchParams<{ id: string }>()
    const targetDataBase = useTargetDatabase()
    const transactionsDatabase = useTransactionsDatabase()
    const [transactions, setTransactions] = useState<TransactionsProps[]>([])
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
        const fetchTransactionsPromise = fetchTransitions()

        await Promise.all([fetchDetailsPromise, fetchTransactionsPromise])
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

    async function fetchTransitions() {
        try {
            const response = await transactionsDatabase.listByTargetId(Number(params.id))
            setTransactions(
                response.map((item) => ( {
                    id: String(item.id),
                    value: numberToCurrency(item.amount),
                    date: String(item.created_at),
                    description: item.observation,
                    type: item.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input
                }))
            )
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar as transações.")
            console.log(error)
        }
    }

    return (
        <View style={{ flex: 1, padding: 24, gap: 32 }}>
            <PageHeader 
                title={details.name}
                rightButton={{
                    icon: 'edit',
                    onPress: () => router.navigate(`/target?id=${params.id}`)
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