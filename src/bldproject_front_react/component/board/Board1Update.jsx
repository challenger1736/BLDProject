import { useContext, useEffect, useRef, useState } from "react";
import { LoginInfoContext } from '../Index';
import board1viewcss from '../../css/board/board1view.css'
import viewcountlogo from '../../img/Project_IMG/view-icon.png'
import { Link, useParams } from 'react-router-dom';
import { Axios } from "axios";
import axios from 'axios';
import AppUpd from "./AppUpd";

export default function Board1Update(){
    const { bno } = useParams();
    console.log(bno);
     // 1. 재랜더링 고정함수 = 얘는 따로 바꿔주지 않는 이상 재렌더링 되도 고정이다.
    const boardWriteFormRef = useRef();

    const {loginInfo} = useContext(LoginInfoContext); // 인덱스의 컨텍스트 참조해서 쓰기

    const[boardDto, setBoardDto] = useState({});

    useEffect(()=>{
        axios.get('/board/board1get.do',{params:{bno:bno}})
        .then(r=>{console.log(r.data)
            setBoardDto(r.data);
        })
        .catch(error=>{console.log(error)})
    },[])

    const onWrite = () =>{

        axios.put('/board/update.do',boardWriteFormRef.current) //. current 에 폼이 들어가 있음
            .then(response =>{console.log(response)
                if(response.data>0){
                    alert('글수정 성공')
                    window.location.href="/board1/"+ response.data;
                    
                }else if(response.data==-1){
                    alert('로그인 후 가능합니다')
                }else{
                    alert('글쓰기 실패')
                }
            
            })
            .catch(error=>{console.log(error); alert('글쓰기 에러')})
    }
    
    let link = '/board1/'+bno;
    return(<>
     <div className="container">
        
        <form className="boardWriteForm" ref={boardWriteFormRef}>
        <input value={bno} name="bno" style={{display:'none'}}/>
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
                <AppUpd content={boardDto.bcontent}/>
                <div className="writeBtnBox">
                    <button type="button" onClick={onWrite}>수정완료</button>
                    <Link to={link}><button type="button">취소</button></Link>
                </div>
            </div>

        </form>
    </div>
    </>
    )
}