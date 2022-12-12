import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: parseInt(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                entities: ['dist/**/*.entity.js'],
                migrations: ['dist/migrations/*.js'],
                synchronize: false
            })
            return dataSource.initialize();
        },
    },
];