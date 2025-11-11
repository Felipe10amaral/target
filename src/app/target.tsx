import {View, Text} from 'react-native'
import { router } from 'expo-router'
import { PageHeader } from '@/components/PageHeader'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

export default function Target() {
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
                <Input label='Nome da meta' placeholder='Carro zero'/>
                <Button title="Salvar" onPress={() => router.back()} />
            </View>
            
        </View>
    )
}