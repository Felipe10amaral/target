import {useSQLiteContext} from 'expo-sqlite'

export function  useTransactionsDatabase() {
    const database = useSQLiteContext()

    async function create(data){}

    return {
        create
    }
}

