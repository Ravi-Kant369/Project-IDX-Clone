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

export const EditorComponent = () => {

  

   const {activeFileTab, } = useActiveFileTabStore();
    
  
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
          defaultValue="// Welcome to the Playground!"
          options={{
            fontSize: 18,
            fontFamily: 'monospace',
          }}
           
          value={activeFileTab?.value? activeFileTab.value:'//Welcome to the playground'}
          

          onMount={(editor, monaco) => {
            // Call the loadTheme function when Monaco editor is mounted
            loadTheme(monaco);
          }}
         
         
         

        />
        </>
      );
  
};

