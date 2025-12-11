import { useSQLiteContext } from "expo-sqlite";

export type TargetCreate = {
    name: string;
    amount: number;
}

export type TargetResponse = {
    id: number
    name: string
    amount: number
    current: number
    percentage: number
    created_at: Date
    updated_at: Date
}

export function useTargetDatabase() {
    const database = useSQLiteContext()
    
    async function create(data: TargetCreate) {
        const statement = await database.prepareAsync(
                "insert into targets (name, amount) values ($name, $amount)"
        )
        
        statement.executeAsync({
            $name: data.name,
            $amount: data.amount
        })
    }

    async function getAllTargets() {}

    async function listBySavedValue() {
        return database.getAllAsync<TargetResponse>(
            `select targets.id, targets.name, targets.amount
             from targets
             order by targets.amount`
        )
    }

    return {
        create,
        listBySavedValue
    }
}