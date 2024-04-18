import { useEffect, useState } from "react"
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import boardlistcss from "../../css/board/boardlist.css";
import { Link } from "react-router-dom";
import Board1View from "./Board1View";

export default function BoardList(){
    // 1. useState 변수
    const [pageDto, setPageDto] = useState({page:1,count:0,data:[],categorya:0,categoryb:0}) // page 1페이지 , count : 볼 총 페이지 네이션 수, data : 받아올 데이터들
    const [recodeview, setRecodeview] = useState(5);
    const [render, setRender] = useState('');

    const handleChange = (event: e, value: value) => {
        pageDto.page = value;
        setPageDto({...pageDto});
    }

    const getBoardList = () =>{
        const info = {page:pageDto.page , categorya:pageDto.categorya , categoryb:pageDto.categoryb, recordview:recodeview}
        console.log(pageDto.categorya);
        console.log(pageDto.categoryb);
        axios.get('/board/list.do',{params:info})
            .then(response=>{
                console.log(response);  
                console.log(response.data);
                setPageDto(response.data);
            })
            .catch(error=>{console.log(error)})
    }
    // category들은 바껴도 State자체가 바뀌는게 아니라 안바뀜, 그래서 category 바꾸고 나서 page0으로 설정하면 알아서 useEffect로 불러와짐. (아직 category 바꾸는 함수 구현 안함)

    useEffect(()=>{
        getBoardList()
    },[pageDto.page, recodeview, render])

    const onCategoryAChoose = (e) => {
        console.log(e.target.value);
        pageDto.categorya = e.target.value;
        setPageDto({...pageDto});
        setRender({...render});
    }

    const onCategoryBChoose = (e) => {
        console.log(e.target.value);
        pageDto.categoryb = e.target.value;
        setPageDto({...pageDto});
        setRender({...render});
    }

    const onRecodeview = (e) => {
        console.log(e.target.value);
        setRecodeview(e.target.value)
    }

    return(<>
        
<div id="boardListForm">

<div id="listView">
    <div id="boardListTop">
        <div id="categoryChooseBox">
            카테고리 선택<br/><br/> 지역 <select className="categoryAChoose " onChange={onCategoryAChoose}>
                <option value={0}>전체</option>
                <option value={1}>자유</option>
                <option value={2}>안산</option>
                <option value={3}>시흥</option>
                <option value={4}>수원</option>
                <option value={5}>부천</option>
                <option value={6}>안양</option>
                <option value={7}>서울</option>
            </select> 음식분류 <select className="categoryBChoose" onChange={onCategoryBChoose}>
                <option value={0}>전체</option>
                <option value={1}>한식</option>
                <option value={2}>일식</option>
                <option value={3}>중식</option>
                <option value={4}>양식</option>
                <option value={5}>분식</option>
                <option value={6}>패스트푸드</option>
            </select>
        </div>
        <div id="pageBoardSizeChooseBox">
            출력 게시글 수 : <select className="pageBoardSize" onChange={onRecodeview}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="30">30</option>
            </select>
        </div>
    </div>

    <div style={{fontSize: '32px', margin: '15px 0px'}}>
        등록된게시글
    </div>
    <div style={{display: 'flex'}}>
        <table className="table table-striped table-hover align-middle" style={{width: '100%', textAlign: 'center'}}>
            <thead>
            <tr className="table-info">
                <th style={{width:'10%'}}>번호</th>
                <th style={{width:'40%'}}>제목</th>
                <th style={{width:'10%'}}>조회수</th>
                <th style={{width:'10%'}}>작성자</th>
                <th style={{width:'20%'}}>등록일자</th>
            </tr>
            </thead>
            <tbody id="boardTableBody">
                {pageDto.data.map((board)=>{
                    let link = "/board1/"+ board.bno;
                    return(
                        
                        <tr>
                            
                        <td>{board.bno}</td>
                        <td style={{textAlign:'left'}}><Link to={link}>{board.bname}</Link></td>
                        <td>{board.bcount}</td>
                        <td>
                            <img src="" style={{width:'20px', borderRadius:'50%'}}/>
                            {board.mid}
                        </td>
                        <td>
                            {board.cdate==null||board.cdate.split('T')[0]}
                        </td>
                        
                    </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    <div id="boardListButton" >
        <Link to="/board/write"><button type="button">글쓰기</button></Link>
    </div>
    <div className="pagination">
     <Pagination count={pageDto.count} page={pageDto.page} onChange={handleChange} />
     </div>
    <div id="boardSearchBox">
        <div className="d-flex">
            {/* <select name="" id="searchQ" style={{width:'20%'}}>
                <option value="1">제목+작성자</option>
                <option value="b.bname">제목</option>
                <option value="m.mid">작성자</option>
            </select> */}
            {/* <input className="keyword" onKeyUp="enterKey()" type="text" placeholder="Search" style={{width:'50%'}}/>
            <button className="btn btn-outline-success" type="button" onClick="doSearch()" style={{width:'30%'}}>검색하기</button> */}
        </div>
    </div>
</div>
</div>
    </>)
}