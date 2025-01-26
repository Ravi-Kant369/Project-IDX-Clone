import { FaJs, FaReact, FaCss3, FaHtml5, FaGit, FaMarkdown, FaFileCode, } from "react-icons/fa";
import { SiSvg } from "react-icons/si";
import { BsFiletypeJson } from "react-icons/bs";

const iconMapping = {
  js: { icon: FaJs, color: "#f7df1e" },
  jsx: { icon: FaReact, color: "#61dafb" },
  css: { icon: FaCss3, color: "#2965f1" },
  html: { icon: FaHtml5, color: "#e34c26" },
  gitignore: { icon: FaGit, color: "#f1502f" },
  json: { icon:  BsFiletypeJson, color: "#000000" },
  svg: { icon: SiSvg, color: "#ff8000" },
  md: { icon: FaMarkdown, color: "#000000" },
  default: { icon: FaFileCode, color: "#9e9e9e" }
};

// export const FileIcon = ({ extension }) => {
//   const { icon: Icon, color } = iconMapping[extension] || iconMapping.default;

//   return <Icon style={{ height: "20px", width: "20px", color }} />;
// };

export const FileIcon = ({ extension, name }) => {
    const { icon: Icon, color } = iconMapping[extension] || iconMapping.default;
  
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Icon style={{ height: '20px', width: '20px', color, marginRight: '8px' }} />
        <span style={{ fontSize: '16px', verticalAlign: 'middle' }}>{name}</span>
      </div>
    );
  };