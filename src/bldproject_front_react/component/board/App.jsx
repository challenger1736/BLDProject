import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Hidden } from "@mui/material";
// import MyButton from "./MyButton";
import Appcss from "../../css/board/App.css"

const App = (props) => {
  const navigate = useNavigate(); // 글쓰기 페이지에서 다른 페이지로 이동할 수 있는 navigate

  console.log(props);

  
//   const titleRef = useRef();

//   const [title, setTitle] = useState("");
  // const [content, setContent] = useState(""); // content State 관리

  const customUploadAdapter = (loader) => {
    console.log(loader);
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then((file) => {
            formData.append("file", file);
            formData.append("name", file.name);

            // axios
            //   .post("/api/v0/file/upload", formData)
            //   .then((res) => {
            //     resolve({
            //       default: res.data.data.uri,
            //     });
            //   })
            //   .catch((err) => reject(err));
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    console.log(editor);
    console.log(editor.plugins);
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

//   const handleSubmit = () => {
//     if (title.length < 1) {
//       titleRef.current.focus();
//       return;
//     }

    // const data = {
    //   title,
    //   content,
    // };


if(JSON.stringify(props)!='{}'){
  

  return(
    <div className="Editorprops">
    <section> 
      <CKEditor
        config={{toolbar: 'none'}}
        editor={ClassicEditor}
        data={props.content}
        
      />
    </section>
  </div>
  )
}

  return (
    <div className="Editor">
      <section> 
        <CKEditor
          editor={ClassicEditor}
          data=""
          config={{ extraPlugins: [uploadPlugin], placeholder : '내용을 입력하세요' }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event,editor)=>{console.log(editor.getData())}}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </section>
    </div>
  );

};

export default App; 