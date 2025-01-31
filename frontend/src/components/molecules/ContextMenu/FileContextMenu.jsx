import './ContextMenu.css';

import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { useEditorSocketStore } from '../../../store/editorSocketStore';

export const FileContextMenu =({
    x,
    y,
    path
})=>{

   const { setIsOpen} =useFileContextMenuStore();

   const { editorSocket } =useEditorSocketStore();

   function handleFileDelete(e){
    e.preventDefault();
    console.log("deleting file at",path);
    editorSocket.emit("deleteFile",{
        pathToFileOrFolder:path
    });
   }



    return(
        <div
           onMouseLeave={()=>{
              console.log("Mouse Left")
              setIsOpen(false);

           }}
           className='fileContextOptionsWrapper'
           style={{
            left:x,
            top:y,

           }}
        >
        <button
          className='fileContextButton'
          onClick={handleFileDelete}
        >
            Delete File
        </button>

        <button
           className='fileContextButton'
        >
            Rename File
        </button>
        

        </div>


    )


}