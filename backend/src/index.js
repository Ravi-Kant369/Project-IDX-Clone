import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { PORT } from './config/serverConfig.js';
import cors from 'cors';
import apiRouter from './routes/index.js';
import chokidar from 'chokidar'
import path from 'node:path';
import { handleEditorSocketEvents } from './socketHandlers/editorHandlers.js';


const app = express();
const server = createServer(app);
const io = new Server(server,{
   cors:{
      origin: "*",
      methods: ["GET", "POST"],
   }
});



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// io.on('connection',(socket)=>{
//    console.log('a user connected');
// });


app.use('/api',apiRouter);

app.get('/ping',(req,res) =>{
   return res.json({message:'pong'});
});

const editorNamespace = io.of('/editor');

editorNamespace.on("connection", (socket)=>{
   console.log("editor connected");


   let projectId = socket.handshake.query.projectId;

   console.log("Project id received after connection" ,projectId);

   //for noew we assume that somehow we will get project id
   if(projectId){
      var watcher = chokidar.watch(`./projects/${projectId}`,{
         ignored:(path) => path.includes("node_modules"),
         persistent : true,

         awaitWriteFinish:{
            stabilityThreshold: 2000
         },
         ignoreInitial:true
      });
     
      watcher.on("all",(event,path) =>{
         console.log(event,path);
      });
   }


   handleEditorSocketEvents(socket,editorNamespace);

   // socket.on("disconnect",async()=>{
   //    await watcher.close();
   //    console.log("editor disconnected");

   // })

});



server.listen(PORT,()=>{
   console.log(`Server is runnig on the port ${PORT}`);
});