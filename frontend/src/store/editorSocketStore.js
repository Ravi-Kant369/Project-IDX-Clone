import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";

export const useEditorSocketStore = create((set)=>({
    editorSocket:null,
    setEditorSocket: (incommingSocket)=>{
        

        const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab;


        incommingSocket?.on("readFileSuccess", (data) =>{
            console.log("Read file success",data);
            activeFileTabSetter(data.path,data.value);
        })



        set({
            editorSocket:incommingSocket
        });
    }
}));