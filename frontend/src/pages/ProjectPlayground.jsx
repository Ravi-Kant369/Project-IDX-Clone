
import { useParams } from "react-router-dom"
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
//import { EditorButton } from "../components/atoms/EditorButton/EditorButton";
import { TreeStructure } from "../components/organisms/TreeStructure";
import { useEffect,useState } from "react";
import { useTreeStructureStore } from "../store/treeStructureStore";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { io } from "socket.io-client";
import { BrowserTerminal } from "../components/molecules/BrowserTerminal/BrowserTerminal";
import { useTerminalSocketStore } from "../store/terminalSocketStore";
import {Browser} from "../components/organisms/Browser/Browser";
import { Button,  } from "antd";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
//import { usePortStore } from "../store/portStrore";

export const ProjectPlayground = ()=>{

    const {projectId:projectIdFromURL} = useParams();

    const {projectId,setProjectId} = useTreeStructureStore();

    const {setEditorSocket} = useEditorSocketStore();

    const {terminalSocket,setTerminalSocket}=useTerminalSocketStore();
   // const {port} = usePortStore();

   const [loadBrowser,setLoadBrowser] = useState(false);

    

    
    useEffect(()=>{
       setProjectId(projectIdFromURL);

       const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`,{
         query: `projectId=${projectIdFromURL}`
       });

       const ws = new WebSocket("ws://localhost:4000/terminal?projectId="+projectIdFromURL);
       
       setTerminalSocket(ws)

       setEditorSocket(editorSocketConn);

      
    },[setProjectId,projectIdFromURL,setEditorSocket,setTerminalSocket]);



//    return(
//     <>
//        <div style={{display:"flex"}}>

//           {projectId && (
//                <div
//                   style={{
//                      backgroundColor:"#3b4f57",
//                      paddingRight:"10px",
//                      paddingTop:"0.3vh",
//                      minWidth:"250px",
//                      maxWidth:"25%",
//                      height:"99.7vh",
//                      overflow:"scroll"
//                   }}
               
//                >

//                 <TreeStructure/>

//                </div>
//           )}
//          <div
//            style={{
            
//             width:"100%",
//             height:"100vh",
            
//            }}
//          >
//           <Allotment>
//             <div
//               style={{
                  
//                   width:"100%",
//                   height:"100vh",
//                   display:"flex",
//                   flexDirection:"column",
//                   justifyContent:"space-between",
//                   backgroundColor:"#282a36"
//               }}
//             >
//              <Allotment
//                vertical={true}
             
//              >
//                 <div>
//                    <EditorComponent/>    
//                 </div>
//                 {/* <Divider style={{color:'black',backgroundColor:'white'}}></Divider> */}

//                 <BrowserTerminal/>
//              </Allotment>

            
            
//             </div>
             
//             <div>
//          <Button
//             onClick={()=>setLoadBrowser(true)}
//          >
//             load Browser
//          </Button>
//          {loadBrowser && projectIdFromURL && terminalSocket && <Browser projectId={projectIdFromURL}/>}
//        </div>

//           </Allotment>


//          </div>
          
//        </div>
       
       
// {/*       
//        <EditorButton  isActive={false}/>
//        <EditorButton  isActive={true}/> */}
       
       

       
      
//     </>
//    )
return (
   
   <div style={{ width:"100vw", height:"100vh"}}>
        <Allotment>
        { projectId && (
               <Allotment.Pane minSize={250} maxSize={400}>

               <div
                   style={{
                       backgroundColor: "#333254",
                       padding: "10px",
                       height: "100%",
                       overflow: "auto",
                   }}
               >
                   <TreeStructure />
               </div>
               </Allotment.Pane> 
           )}

        
{/*   
       <div
           style={{
               width: "100vw",
               height: "100vh"
           }}
       > */}
           <Allotment.Pane minSize={300}>
               <div
                   style={{
                       display: "flex",
                       flexDirection: "column",
                       width: "100%",
                       height: "100%",
                       backgroundColor: "#282a36"

                   }}
               >

               <Allotment
                   vertical={true}
               >
                   <EditorComponent />
                   <BrowserTerminal />
               </Allotment>
                 
             </div>
          </Allotment.Pane>


               <Allotment.Pane preferredSize={400}>
                    <div
                        style={{
                            padding: "10px",
                            height: "100%"
                        }}
                    >
                        <Button
                            style={{ marginBottom: "10px" }}
                            onClick={() => setLoadBrowser(true)}
                        >
                            Load my browser
                        </Button>
                        {loadBrowser && projectIdFromURL && terminalSocket && (
                            <Browser projectId={projectIdFromURL} />
                        )}
                    </div>
                </Allotment.Pane>
            </Allotment>
        </div>
   
      
      //  {/* <EditorButton isActive={false} /> 
      //  <EditorButton isActive={true}/>  */}
       
 )
}   
   



