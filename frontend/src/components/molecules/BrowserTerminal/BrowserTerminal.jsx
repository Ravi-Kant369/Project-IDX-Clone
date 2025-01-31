import {Terminal} from '@xterm/xterm';
import {FitAddon} from '@xterm/addon-fit';
import "@xterm/xterm/css/xterm.css"; 
import { useEffect,useRef } from 'react';
import {io} from 'socket.io-client';
import { useParams } from 'react-router-dom';   

export const BrowserTerminal = () => {

    const terminalRef = useRef(null);
    const socket = useRef(null);
    const {projectId:projectIdFromURL} = useParams();

    useEffect(()=>{
        const term = new Terminal({
            cursorBlink:true,
            fontSize:16,
            fontFamily:"fira code",
            theme:{
                background: "#282a37",
                foreground: "#f8f8f2",
                cursor:"#f8f8f2",
                cursorAccent:"#282a37",
                red:"#ff5555",
                green:"#50fa7b",
                yellow:"#f1fa8c",
                cyan:"#8be9fd",

            },
            convertEol:true, //auto convert end of line characters
        });
        term.open(terminalRef.current);
        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);   //fit the terminal to the size of the parent container

       socket.current = io(`${import.meta.env.VITE_BACKEND_URL}/terminal`,{
          query: `projectId=${projectIdFromURL}`
       });

         socket.current.on("shell-output",(data)=>{
             term.write(data);
         });

         term.onData((data)=>{
             
             console.log("data",data);
             socket.current.emit("shell-input",data);
         });

         return ()=>{
                socket.dispose();
                socket.current.disconnect();
         }



    },[]);

    return (
    <>
      <div
        ref={terminalRef}
        style={{
           
            height:"25vh",
            overflow:"auto"

        }}
        className='terminal'
        id="terminal-container"

      >

      </div>
    </>
    )

}