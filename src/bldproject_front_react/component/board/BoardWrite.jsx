import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import App from "./App";
import boardwritecss from "../../css/board/boardwrite.css";
import AppUpd from "./AppUpd";




export default function BoardWrite(props){

    // 1. 재랜더링 고정함수 = 얘는 따로 바꿔주지 않는 이상 재렌더링 되도 고정이다.
    const boardWriteFormRef = useRef();
    const [content, setContent] = useState("");
    const editorchange = (event, editor) => {
        setContent(editor.getData());
        console.log({ event, editor, content });
      }

    const onWrite = () =>{
        const formData = new FormData();
        formData.append('categorya', document.querySelector('[name=categorya]').value);
        formData.append('categoryb', document.querySelector('[name=categoryb]').value);
        formData.append('bname', document.getElementById('bname').value);
        formData.append('bcontent', content);

        axios.post('/board/create.do',formData) //. current 에 폼이 들어가 있음
            .then(response =>{console.log(response)
                if(response.data>0){
                    alert('글쓰기 성공')
                    window.location.href="/board1/"+ response.data;
                    
                }else if(response.data==-1){
                    alert('로그인 후 가능합니다')
                }else{
                    alert('글쓰기 실패')
                }
            
            })
            .catch(error=>{console.log(error); alert('글쓰기 에러')})
    }

    return(<>
     <div className="container">
        
        <form className="boardWriteForm" ref={boardWriteFormRef}>
            <h3 style={{fontSize : '32px', marginTop: '30px'}}>게시글 쓰기</h3><br/>
            <div>
                지역 : <select name="categorya">
                    <option value="1"> 자유 </option>
                    <option value="2"> 안산 </option>
                    <option value="3"> 시흥 </option>
                    <option value="4"> 수원 </option>
                    <option value="5"> 부천 </option>
                    <option value="6"> 안양 </option>
                    <option value="7"> 서울 </option>
                </select> 음식분류 : <select name="categoryb">
                    <option value="0"> 선택안함 </option>
                    <option value="1"> 한식 </option>
                    <option value="2"> 일식 </option>
                    <option value="3"> 중식 </option>
                    <option value="4"> 양식 </option>
                    <option value="5"> 분식 </option>
                    <option value="6"> 패스트푸드 </option>

                </select>
            </div>
            <div id="boardNameBox">
                <span>제목</span>
                <input id="bname"className="bname" name="bname" type="text"/><br/>
                <div id="nameCondition" style={{color: 'red'}}></div>
            </div>
            <div id="summernoteBox">
                <span>내용</span>
                <App editorchange={editorchange} />
                <div className="writeBtnBox">
                    <button type="button" onClick={onWrite}>쓰기</button>
                    <Link to="/boardlist"><button type="button">돌아가기</button></Link>
                </div>
            </div>

        </form>
    </div>
    </>)

}