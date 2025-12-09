import {View, Text, Alert} from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { PageHeader } from '@/components/PageHeader'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { CurrencyInput } from '@/components/CurrencyInput'
import { useState } from 'react'

export default function Target() {
    const [isProcessing, setIsProcessing] = useState(false)
    const [name, setName] = useState("")
    const [amount, setAmount] = useState(0)

    const params = useLocalSearchParams<{ id?: string }>()

    function handleSave() {
        if(!name.trim() || amount <= 0) {
            return Alert.alert("Atenção", "Preencha todos os campos corretamente.")
        }

        setIsProcessing(true)

        if(params.id) {

        } 
        else {
            create()
        }
    }

    async function create() {
        try {
            Alert.alert("Sucesso", "Meta criada com sucesso.", [
                {
                    text: "OK",
                    onPress: () => router.back()
                }
            ])
        } catch (error) {
            Alert.alert("Erro", "Não foi possível criar a meta.")
            console.log(error)
            setIsProcessing(false)
        }
    }
    return (
        <View style={{ flex: 1, padding: 24 }}>
           <Text>Target</Text>
            <PageHeader 
                title="Meta"
                subtitle="Economize para alcançar suas metas" 
                rightButton={{
                    icon: 'edit',
                    onPress: () => {}
                }}           
            />
            <View style={{ marginTop: 32, gap: 24 }}>
                <Input value={name} label='Nome da meta' placeholder='Carro zero' onChangeText={setName}/>
                <CurrencyInput label="Valor alvo" value={amount} onChangeValue={setAmount}/>
                <Button title="Salvar" onPress={() => handleSave()} isLoading={isProcessing} />
            </View>
            
        </View>
    )
}