import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import {useTreeStructureStore} from './treeStructureStore'

export const useEditorSocketStore = create((set)=>({
    editorSocket:null,
    setEditorSocket: (incommingSocket)=>{
        
        // here we are accessing the zustand store inside another zustand store 
        const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab;
        const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;

        incommingSocket?.on("readFileSuccess", (data) =>{
            console.log("Read file success",data);
            const fileExtension = data.path.split('.').pop();
            activeFileTabSetter(data.path,data.value,fileExtension);
        })
        
        incommingSocket?.on("writeFileSuccess",(data)=>{
            console.log("Write file success",data);
            // incommingSocket.emit("readFile",{
            //     pathToFileOrFolder:data.path
            // })
        })
        
        incommingSocket?.on("deleteFileSuccess",()=>{
            projectTreeStructureSetter();
        })

        //incomingSocket?.on("getPortSuccess",())

        set({
            editorSocket:incommingSocket
        });
    }
}));