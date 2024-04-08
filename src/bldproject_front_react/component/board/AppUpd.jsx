import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Hidden } from "@mui/material";
// import MyButton from "./MyButton";

const AppUpd = (props) => {
  const navigate = useNavigate(); // 글쓰기 페이지에서 다른 페이지로 이동할 수 있는 navigate

  console.log(props);

  
//   const titleRef = useRef();

//   const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // content State 관리

  const customUploadAdapter = (loader) => {
    console.log(loader);
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then((file) => {
            formData.append("file", file);

            // axios
            //   .post("http://localhost:8080/api/v0/file/upload", formData)
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

    // axios.post("http://localhost:8080/api/v0/post", data).then((res) => {
    //   if (res.status === 200) {
    //     navigate("/", { replace: true });
    //     return;
    //   } else {
    //     alert("업로드 실패.");
    //     return;
    //   }
    // });
//   };


  return (
    <div className="Editor">
      <section> 
      <input value={content} style={{display: 'none'}} name="bcontent"/>
      {/* bcontent dto에 들어가나 확인용 */}
        <CKEditor
          editor={ClassicEditor}
          data={props.content}
          config={{ extraPlugins: [uploadPlugin], placeholder : '내용을 입력하세요' }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            setContent(editor.getData());
            console.log({ event, editor, content });
          }}
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

export default AppUpd; 