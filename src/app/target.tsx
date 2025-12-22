import {View, Text, Alert} from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { PageHeader } from '@/components/PageHeader'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { CurrencyInput } from '@/components/CurrencyInput'
import { useEffect, useState } from 'react'
import { useTargetDatabase } from '@/database/useTargetDatabase'

export default function Target() {
    const [isProcessing, setIsProcessing] = useState(false)
    const [name, setName] = useState("")
    const [amount, setAmount] = useState(0)

    const params = useLocalSearchParams<{ id?: string }>()
    const targetDatabase = useTargetDatabase()

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
            await targetDatabase.create({name, amount})
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

    async function fetchDetails(id: number) {
        try {
            const response = await targetDatabase.getListOne(id)
            setName(response.name)
            setAmount(response.amount)
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.")
            console.log(error)
        }
    }

    useEffect(() => {
        if(params.id) {
            fetchDetails(Number(params.id))
        }
    }, [params.id])
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