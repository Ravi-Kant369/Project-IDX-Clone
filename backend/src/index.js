import express from 'express'
import { PORT } from './config/serverConfig.js';
import cors from 'cors'
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping',(req,res) =>{
   return res.json({message:'pong'});
});

app.listen(PORT,()=>{
   console.log(`Server is runnig on the port ${PORT}`);
});