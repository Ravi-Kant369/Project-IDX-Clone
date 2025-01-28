// import Editor from '@monaco-editor/react';

// export const EditorComponent =() =>{
//     return (
//         <>

//           <Editor 
//               height={'90vh'}
//               width={'100%'}
//               defaultLanguage='javascript'
//               defaultValue='// Welcome to the playground'
//               options={{
//                 fontSize: 18,
//                 fontFamily:'monospace'
//             }}

//           />

//        </>
//     )
// }


import Editor from '@monaco-editor/react';

import { useActiveFileTabStore } from '../../../store/activeFileTabStore';
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { extensionToFileType } from '../../../utils/extensionToFileType';

export const EditorComponent = () => {
  
   let timerId = null;
   
   const {activeFileTab, } = useActiveFileTabStore();

   const {editorSocket} = useEditorSocketStore();

   function handleChange(value){
           if(timerId!==null){
            clearTimeout(timerId);
           }
            timerId=setTimeout(()=>{
            const editorContent = value;
            console.log("Sending the writefile event")
            editorSocket.emit("writeFile",{
              data:editorContent,
              pathToFileOrFolder:activeFileTab.path
          })
        },2000);  
   }
    
  
    const loadTheme = async (monaco) => {
        try {
          // Dynamically load the Night Owl theme
          var themeData = await import('monaco-themes/themes/Night Owl.json');
          
          // Wait for Monaco to be initialized, then define and set the theme
          
          monaco.editor.defineTheme('night-owl', themeData);
          monaco.editor.setTheme('night-owl');
        } catch (error) {
          console.error('Error loading Night Owl theme:', error);
        }
      }


     
      return (
        <>
        <Editor
          height={'100vh'}
          width={'100%'}
          defaultLanguage="javascript"
          defaultValue={undefined}
          options={{
            fontSize: 18,
            fontFamily: 'monospace',
          }}
          language={extensionToFileType(activeFileTab?.extension)}
          onChange={handleChange}
          value={activeFileTab?.value? activeFileTab.value:'//Welcome to the playground'}
          

          onMount={(editor, monaco) => {
            // Call the loadTheme function when Monaco editor is mounted
            loadTheme(monaco);
          }}
         
         
         

        />
        </>
      );
  
};

