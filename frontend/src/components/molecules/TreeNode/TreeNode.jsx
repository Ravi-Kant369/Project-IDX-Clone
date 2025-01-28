import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/fileIcon";
import { useEditorSocketStore } from "../../../store/editorSocketStore";

export const TreeNode = ({ fileFolderData }) => {
  const [visibility, setVisibility] = useState({});

  const { editorSocket } =useEditorSocketStore();

  function toggleVisibility(name) {
    setVisibility({
      ...visibility,
      [name]: !visibility[name],
    });
  }

  function computeExtension(fileFolderData){
      const names = fileFolderData.name.split(".");
      return names[names.length-1];
  }

  function handleDoubleClick(fileFolderData){
    console.log("Doubled clicked on", fileFolderData);
    editorSocket.emit("readFile",{
      pathToFileOrFolder:fileFolderData.path
    })
    
  }

  return (
    fileFolderData && (
      <div
        style={{
          paddingLeft: "15px",
          color: "white",
        }}
      >
        {fileFolderData.children ? (
          <button
            onClick={() => toggleVisibility(fileFolderData.name)}
            style={{
              border: "none",
              cursor: "pointer",
              outline: "none",
              color: "white",
              background:"transparent",
              paddingTop: "16px",
              fontSize: "16px",
            }}
          >
            {visibility[fileFolderData.name] ? ( <IoIosArrowDown />  ) : ( <IoIosArrowForward />)}
             
            {fileFolderData.name}
          </button>
        ) : (

       <div style={{ display:"flex",alignContent:"center", justifyContent:"center"}}>
             
             <FileIcon extension={computeExtension(fileFolderData)}/>
            
            <p
              onDoubleClick={()=>handleDoubleClick(fileFolderData)}
            >
               {fileFolderData.name}
            </p>
       </div>

         
        )}

        {visibility[fileFolderData.name] && fileFolderData.children && (
          fileFolderData.children.map((child) => {
            return (
              <TreeNode
                fileFolderData={child}
                key={child.name}
              />
            );
          })
        )}
      </div>
    )
  );
};
