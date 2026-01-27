import { useSQLiteContext } from "expo-sqlite";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

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

export type TargetUpdate = TargetCreate & {
    id: string
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

    async function listBySavedValue() {
        return database.getAllAsync<TargetResponse>(
            `select targets.id, targets.name, targets.amount,
                coalesce(sum(transactions.amount), 0) as current,
                coalesce((sum(transactions.amount) / targets.amount) * 100, 0) as percentage,
                targets.created_at, targets.updated_at
            from targets
             left join transactions on targets.id = transactions.target_id
                group by targets.id, targets.name, targets.amount
                order by percentage desc
             `
        )
    }

    async function getListOne(id: number) {
        return database.getFirstAsync<TargetResponse>(
            `select targets.id, targets.name, targets.amount,
                coalesce(sum(transactions.amount), 0) as current,
                coalesce((sum(transactions.amount) / targets.amount) * 100, 0) as percentage,
                targets.created_at, targets.updated_at
             from targets
             left join transactions on targets.id = transactions.target_id
             where targets.id = ${id}
             `
        )
    }

    async function update(data: TargetUpdate) {
        const statement = await database.prepareAsync(`
                update targets
                set name = $name, amount = $amount, updated_at = CURRENT_TIMESTAMP
                where id = $id 
        `)
        statement.executeAsync({
            $id: data.id,
            $name: data.name,
            $amount: data.amount
        })
    }

    async function remove(id: string) {
        await database.runAsync("delete from targets where id = ?", id)
    }

    return {
        create,
        listBySavedValue,
        getListOne,
        update,
        remove
    }
}