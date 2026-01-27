import {useSQLiteContext} from 'expo-sqlite'

export type TransactionCreate = {
    target_id : number
    amount : number
    observation?: string
}

export type TransactionsResponse = {
    id: number
    target_id : number
    amount : number
    observation?: string
    created_at: Date
    updated_at: Date
}

export type Summary = {
    input: number
    output: number
}

export function  useTransactionsDatabase() {
    const database = useSQLiteContext()

    async function create(data){
        const statement = await database.prepareAsync(
            `
            insert into transactions (target_id, amount, observation)
            values ($target_id, $amount, $observation)
            `
        )

        statement.executeAsync({
            $target_id: data.target_id,
            $amount: data.amount,
            $observation: data.observation
        })
    }

    async function listByTargetId(id: number) {
        return database.getAllAsync<TransactionsResponse>(`
            select id, target_id, amount, observation, created_at, updated_at 
            from transactions
            where target_id = ${id}
            ORDER BY created_at DESC
        `)
    }

    async function remove(id: number) {
        await database.runAsync("delete from transactions where id = ?", id)
    }

    function summary() {
        return database.getFirstAsync<Summary>(`
            select coalesce(sum(case when amount > 0 then amount else 0 end), 0) as input,
                   coalesce(sum(case when amount < 0 then amount else 0 end), 0) as output
            from transactions
        `)
    }

    return {
        create,
        listByTargetId,
        remove,
        summary
    }
}

