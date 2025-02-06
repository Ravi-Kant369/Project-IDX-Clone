import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import {useTreeStructureStore} from './treeStructureStore';
import { usePortStore } from "./portStrore";

export const useEditorSocketStore = create((set)=>({
    editorSocket:null,
    setEditorSocket: (incommingSocket)=>{
        
        // here we are accessing the zustand store inside another zustand store 
        const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab;
        const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;
        const portSetter = usePortStore.getState().setPort;

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

        incommingSocket?.on("getPortSuccess",({port})=>{
                console.log("Port is",port);
                portSetter(port);
        });

        set({
            editorSocket:incommingSocket
        });
    }
}));