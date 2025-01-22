import './EditorButton.css';

export const EditorButton = ({ isActive }) =>{

   function handleClick(){

   }

    return (
        <button
          className="editor-button"
          style={{
            color: isActive ? 'white' : '#555661',
            backgroundColor: isActive ? '#383857': '#7c8394',
            borderTop: isActive? '2px solid #f56c0a': 'none'

            }}
            onClick={handleClick}
        >
            file.js
        </button>
    )
}