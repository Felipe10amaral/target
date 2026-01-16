import { Alert, View } from "react-native";
import { Button } from '../../components/Button'
import {useLocalSearchParams, router} from "expo-router";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { TransactionType } from "@/components/TransactionType";
import { use, useState } from "react";
import { TransactionTypes } from "@/utils/transactionsTypes";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";


export default function Transaction() {
    const params = useLocalSearchParams<{ id: string }>();
    const [type, setType] = useState(TransactionTypes.Input)
    const [isCreating, setIsCreating] = useState(false)
    const [amount, setAmount] = useState(0)
    const [observation, setObservation] = useState("")

    const transactions = useTransactionsDatabase()

    async function handleCreate() {
        try {
            if(amount <= 0 ){
                return Alert.alert("Erro", "O valor da transação deve ser maior que zero.")
            }
            setIsCreating(true)

            await transactions.create({
                target_id: Number(params.id),
                amount: type === TransactionTypes.Output ? amount * -1 : amount,
                observation
            })
            Alert.alert("Sucesso", "Transação criada com sucesso.", [
                {
                    text: "Ok",
                    onPress: () => router.back()
                }
            ])
            
        } catch (error) {
            Alert.alert("Erro", "Não foi possível criar a transação.")
            console.log(error)
            setIsCreating(false)
        }
    }
    return (
        <View style={{ flex: 1, padding: 24}}>
            <PageHeader 
                title="Nova transação" 
                subtitle="A cada valor guardado você fica mais próximo dos seus objetivos"
            />
            <View  style={{ marginTop: 32, gap: 24 }}>
                <TransactionType 
                    selected={type}
                    onChange={setType}
                />
                
                <CurrencyInput value={amount} label="Valor" onChangeValue={setAmount}  />
                <Input label="Motivo (opcional)" placeholder="Ex.: Investir em CDB" onChangeText={setObservation} />
                
                <Button title="Salvar" onPress={handleCreate} isLoading={isCreating} />
            </View>
        </View>
    )
}