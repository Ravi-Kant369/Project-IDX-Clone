
import { useParams } from "react-router-dom"
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";
import { TreeStructure } from "../components/organisms/TreeStructure";
import { useEffect } from "react";
import { useTreeStructureStore } from "../store/treeStructureStore";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { io } from "socket.io-client";
import { BrowserTerminal } from "../components/molecules/BrowserTerminal/BrowserTerminal";

export const ProjectPlayground = ()=>{

    const {projectId:projectIdFromURL} = useParams();

    const {projectId,setProjectId} = useTreeStructureStore();

    const {setEditorSocket} = useEditorSocketStore();

    useEffect(()=>{
       setProjectId(projectIdFromURL);
       const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`,{
         query: `projectId=${projectIdFromURL}`
       });
       setEditorSocket(editorSocketConn);
    },[setProjectId,projectIdFromURL,setEditorSocket]);



   return(
    <>
       <div style={{display:"flex"}}>

          {projectId && (
               <div
                  style={{
                     backgroundColor:"#3b4f57",
                     paddingRight:"10px",
                     paddingTop:"0.3vh",
                     minWidth:"250px",
                     maxWidth:"25%",
                     height:"99.7vh",
                     overflow:"scroll"
                  }}
               
               >

                <TreeStructure/>

               </div>
          )}

          <EditorComponent/>
       </div>
       
       
      
       <EditorButton  isActive={false}/>
       <EditorButton  isActive={true}/>
       <div>
         <BrowserTerminal/>
       </div>
      
    </>
   )


}