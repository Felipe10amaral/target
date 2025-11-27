import { View } from "react-native";
import { Button } from '../../components/Button'
import {useLocalSearchParams, router} from "expo-router";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { TransactionType } from "@/components/TransactionType";
import { useState } from "react";
import { TransactionTypes } from "@/utils/transactionsTypes";


export default function Transaction() {
    const params = useLocalSearchParams<{ id: string }>();
    const [type, setType] = useState(TransactionTypes.Input)
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
                
                <CurrencyInput value={0} label="Valor" />
                <Input label="Motivo (opcional)" placeholder="Ex.: Investir em CDB" />
                
                <Button title="Salvar" onPress={() => router.back()} />
            </View>
        </View>
    )
}