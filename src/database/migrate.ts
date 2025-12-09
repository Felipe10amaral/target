import { type SQLiteDatabase} from 'expo-sqlite'

export async function migrate(database: SQLiteDatabase) {
    await database.execAsync(`
        PRAGMA foreign_keys = ON; // Ativar chave estrangeira

        CREATE TABLE IF NOT EXISTS targets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            amount FLOAT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

    `)
}