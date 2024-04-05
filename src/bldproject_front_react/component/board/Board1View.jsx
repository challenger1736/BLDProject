import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import viewcountlogo from '../../img/Project_IMG/view-icon.png'
import board1viewcss from '../../css/board/board1view.css'

export default function Board1View(props){
    const { bno } = useParams();
    console.log(bno);

    const[boardDto, setBoardDto] = useState({});

    useEffect(()=>{
    axios.get('/board/board1get.do',{params:{bno:bno}})
        .then(r=>{console.log(r.data)
            setBoardDto(r.data);
        })
        .catch(error=>{console.log(error)})
    },[])

    const onBDelete = (e)=>{
        // axios.delete();
    }


    return(<>
    <div id="boardView">
    <div id="boardContent">
        <div id="viewbname" style={{padding:'20px'}}>{boardDto.bname}</div><br/>

        <div id="memberheard">
            <div id="boardWriteInfo">
                <img src="" alt='사진'/>
                <div>
                    <div id="viewWriter">
                        <span>작성자 : </span><div id="writerName">{boardDto.mid}</div>
                    </div>
                    <div id="viewUpdate">
                        <span>마지막수정일 : </span><div id="registrationDate1">{boardDto.udate}</div>
                    </div>
                    <div id='viewCreate'>
                        <span>작성일 : </span><div id="registrationDate">{boardDto.cdate}</div>
                    </div>
                </div>
            </div>
            
            <div id="viewCount">
                <img src={viewcountlogo}/>
                <div id="viewpoint">조회수 {boardDto.bcount} </div>
            </div>
        </div>

        <div id="boardViewContent">
            <div id="categoryBox">
                카테고리 : <span id="categoryA">{boardDto.categorya}</span>-<span id="categoryB">{boardDto.categoryb}</span>
            </div>
            <div id="contentBox">
                {boardDto.bcontent}
            </div>
            <div id="buttonBox">
               
                <button className="ButtonOff " type="button" onClick="onUndate()">수정</button>
                <button className="ButtonOff " type="button" onClick={onBDelete}>삭제</button>
                <button className="ButtonOff ButtonOn" type="button"><Link to="/boardlist">목록으로</Link></button>
                {/* 원래 보던 목록으로 구현해보기 */}
            </div>
        </div>
    </div>

    <div id="replyWriteBox">
        <div id="replyinputBox">
            <div className="input-group">
                <textarea onkeyup="replyContentMsg()" id="replyContent" className="form-control" aria-label="With textarea"></textarea>
            </div>
            <div id="replyButtonBox">
                <button type="button" onclick="replyWrite()">댓글 등록하기</button>
            </div>
        </div>
        
        <div id="replyContentMsg" className="msgcolorRed"></div>
    </div>

    <div id="replyViewBox">
        <div id="replytitle">
            <div className="replyView">
                <div>댓글</div>
                <div>작성자</div>
                <div>날짜</div>
            </div>
        </div>
        <div id="replyprint">
            <div className="replyView">
                <div className="rcContentBox">
                    <div className="rcContent">댓글내용</div>
                    <div className="rcNameDate">
                        <div className="rcWriterName">작성자</div>
                        <div className="rcDate">날짜</div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>

</div>
    </>)
}