import express from 'express';
import { AppDataSource } from './dbconfig/db';
import router from './router/router';
const app = express();
app.use(express.json());
const PORT = 9000;
AppDataSource.initialize().then(() => {
    console.log("AppDataSource initialized succeessfully");
}).catch((err: any) => {
    console.log(err);
})
app.use("/api", router)
app.listen(PORT, () => {
    console.log(`Server is running....`);
})