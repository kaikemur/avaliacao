import express from "express";
import dotenv from "dotenv";
import funcionariosRoutes from "./src/routes/funcionariosRoutes.js"

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3000;

app.get("/",(req,res) => {
    res.send("servidor esta funcionando👍👍🏾")
})



app.use("/funcionarios",funcionariosRoutes);


app.listen(serverPort,() => {
    console.log(`servidor esta funcionando em http://localhost:${serverPort}`);
    
})