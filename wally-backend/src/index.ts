import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(async () => {
    console.log("Database connected")
}).catch(error => console.log(error))
