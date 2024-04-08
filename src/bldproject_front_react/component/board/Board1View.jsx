import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import viewcountlogo from '../../img/Project_IMG/view-icon.png'
import board1viewcss from '../../css/board/board1view.css'
import { LoginInfoContext } from '../Index';
import App from './App';

export default function Board1View(props){
    const { bno } = useParams();
    console.log(bno);

    const {loginInfo} = useContext(LoginInfoContext); // 인덱스의 컨텍스트 참조해서 쓰기

    const[boardDto, setBoardDto] = useState({replyDtoList:[]});
    

    const[reply, setReply] = useState('');
    const[replyList, setReplyList] = useState([]);
    const[reload, setReload] = useState([])
    const boardView = useRef();
    const [isCountIncreased, setIsCountIncreased] = useState(false);
    
    useEffect(()=>{
    axios.get('/board/board1get.do',{params:{bno:bno}})
        .then(r=>{console.log(r.data)
            setBoardDto(r.data);
            setReplyList(r.data.replyDtoList);
            if (!isCountIncreased) {
                increasePostViewCount(bno);
                setIsCountIncreased(true);
              }
           
        })
        .catch(error=>{console.log(error);
        })
    },[reload])



   
    console.log(loginInfo);
    // 조회수 증가
    const increasePostViewCount = () => {
        axios.get("/board/increasebcount", {params:{bno:bno}})
          .then(response => { 
          })
          .catch(error => {
            console.error('조회수 증가 중 오류 발생:', error);
          });
      };


    // 글 삭제
    const onBDelete = (e)=>{
        if(window.confirm('정말 삭제하시겠습니까?')){
        axios.delete('/board/board1delete.do',{params:{bno:bno}})
            .then(r=>{console.log(r.data);
            if(r.data){
                alert('글 삭제 완료')
                window.location.href="/boardlist"
            }else{
                alert('글 삭제 실패')
            }
            })
            .catch(error=>{console.log(error)})
        }else{ return; }
    }

    // 댓글 쓰기
    const changereplyContent = (e) => {
        setReply(e.target.value);
    }

    // 댓글 등록
    const replyWrite = (e)=>{
        // axios.post('') // 하면서 reply 초기화 시켜주면 state 바뀌면서 화면 구성될듯.
        axios.post('/reply/write.do', {rpcontent:reply, bno:bno})
            .then(r=>{console.log(r.data);
            if(r.data){
                setReply('')
                setReload([...reload])
            }else{
                alert('댓글 등록 실패')
            }
            })
            .catch(error=>{console.log(error)})

    }
    // 댓글 삭제
    const replyDelete = (rpno)=>{
        axios.delete('/reply/delete.do', {params:{rpno:rpno}})
            .then(r=>{
                if(r.data){alert('댓글 삭제 완료')
                setReload([...reload])
            }
                else{alert('댓글 삭제 실패')}
                
            })
            .catch(error=>{console.log(error)})
    }



    let link = "/board/update/"+ boardDto.bno;
   
    return(<>
    
    <div id="boardView" ref={boardView}>
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
                        <span>작성일 : </span><div id="registrationDate" >{boardDto.cdate}</div>
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
                <App content={boardDto.bcontent}/>
            </div>
            <div id="buttonBox">
           
                {loginInfo.mno == boardDto.mno || loginInfo.mstate==3 ? <><button type="button"><Link to={link}>수정</Link></button>
                <button type="button" onClick={onBDelete}>삭제</button></>:<></>}
                <button type="button"><Link to="/boardlist">목록으로</Link></button>
            </div>
        </div>
    </div>

    <div id="replyWriteBox">
        <div id="replyinputBox">
            <div className="input-group">
                <textarea onChange={changereplyContent} value={reply} name="rpcontent" id="replyContent" className="form-control" aria-label="With textarea"></textarea>
            </div>
            <div id="replyButtonBox">
                <button type="button" onClick={replyWrite}>댓글 등록하기</button>
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
            
            
                {
                replyList.map((dto)=>{
                    return (<>
                    <div className="replyView">
                    <div className="rcContentBox">
                        <div className="rcContent">{dto.rpcontent}</div>
                        <div className="rcNameDate">
                            <div className="rcWriterName">{dto.mid}</div>
                            <div className="rcDate">{dto.cdate==null?<></>:dto.cdate.split('T')[0]}</div>
                            
                        </div>
                        <button onClick={()=>replyDelete(dto.rpno)} style={{width:'100px'}} >삭제</button>
                    </div>
                    
                    </div></>)
            })}
            
            
        </div>
        
    </div>

</div>
    </>)
}