import express from 'express';
import cors from 'cors';
import path from 'path';
import fileUpload from 'express-fileupload';
import { AppDataSource } from './dbconfig/db';
import router from './router/router';
const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({ createParentPath: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
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
