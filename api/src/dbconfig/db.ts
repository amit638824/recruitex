import { DataSource } from 'typeorm';
import 'reflect-metadata';
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345",//apne sys ka pass jo tm pg install krte time rkhe the 
    database: "recruitex",//phle pgadmin4 me jakr db create then connect hoga
    synchronize: true, //code tbl update 
    entities: ['src/entities/**/*.ts'],// model => table
    migrations: ['src/migrations/**/*.ts'],//code -> sql
    subscribers: ['src/subscribers/**/*.ts']// subscriber 
})

