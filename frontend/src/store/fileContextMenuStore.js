import {create} from 'zustand';

export const useFileContextMenuStore = create((set)=>({
    x: null,
    y: null,
    isOpen:false,
    file:null,
    setX:(incomingX)=>{
        set({
            x:incomingX
        })
    },
    setY:(incomingY)=>{
        set({
            y:incomingY
        })
    },
    setIsOpen:(incommingIsOpen)=>{
        set({
            isOpen:incommingIsOpen
        })
    },
    setFile:(incomingFile)=>{
        set({
            file:incomingFile
        })
    }
}));
