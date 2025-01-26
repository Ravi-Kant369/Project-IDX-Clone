import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/fileIcon";

export const TreeNode = ({ fileFolderData }) => {
  const [visibility, setVisibility] = useState({});

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
            
            <p>
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
