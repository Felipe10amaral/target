import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transactions, TransactionsProps } from "@/components/Transactions";
import { TransactionTypes } from "@/utils/transactionsTypes";
import { useLocalSearchParams, router } from "expo-router";
import { View } from "react-native";

const details = {
    current: 'R$580,00',
    target: 'R$2.000,00',
    percentage: 25,
}

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
    const params = useLocalSearchParams()

    return (
        <View style={{ flex: 1, padding: 24, gap: 32 }}>
            <PageHeader 
                title="Apple Watch"
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