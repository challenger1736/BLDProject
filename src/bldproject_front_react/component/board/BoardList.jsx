import { useEffect, useState } from "react"
import Pagination from '@mui/material/Pagination';
import axios from "axios";


export default function BoardList(){
    // 1. useState 변수
    const [pageDto, setPageDto] = useState({page:1,count:0,data:[],categorya:0,categoryb:0}) // page 1페이지 , count : 볼 페이지 수, data : 받아올 데이터들

    const handleChange = (event: e, value: value) => {
        pageDto.page = value;
        setPageDto({...pageDto});
    }

    const getBoardList = () =>{
        const info = {page:pageDto.page , categorya:pageDto.categorya , categoryb:pageDto.categoryb, recordview:4}
        axios.get('/board/get.do',{params:info})
            .then(response=>{
                console.log(response);
                setPageDto(response.data);
            })
            .catch(error=>{console.log(error)})
    }
    // category들은 바껴도 State자체가 바뀌는게 아니라 안바뀜, 그래서 category 바꾸고 나서 page0으로 설정하면 알아서 useEffect로 불러와짐. (아직 category 바꾸는 함수 구현 안함)

    useEffect(()=>{
        getBoardList()
    },[pageDto.page])

    return(<>
        
<div id="boardListForm">

<div id="listView"> 게시글 출력라인 
     카테고리 / 페이지 출력수
    <div id="boardListTop">
        <div id="categoryChooseBox"> 카테고리 
             지역 카테고리 
            카테고리 선택 {'>'} <select className="categoryAChoose " onChange="onCategoryAChoose(this)">
                <option value="0">전체</option>
                <option value="1">자유</option>
                <option value="2">안산</option>
                <option value="3">시흥</option>
                <option value="4">수원</option>
                <option value="5">부천</option>
                <option value="6">안양</option>
                <option value="7">서울</option>
            </select>
             음식분류 카테고리 
            <select className="categoryBChoose" onChange="onCategoryBChoose(this)">
                <option value="0">전체</option>
                <option value="1">한식</option>
                <option value="2">일식</option>
                <option value="3">중식</option>
                <option value="4">양식</option>
                <option value="5">분식</option>
                <option value="6">패스트푸드</option>
            </select>
        </div>
        <div id="pageBoardSizeChooseBox">
             onChange 값이 바뀔때마다 실행 
            출력 게시글 수 : <select className="pageBoardSize" onChange="onPageBoardSize(this)">
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
                <th style={{width:'20%'}}>등록일자</th>
                <th style={{width:'50%'}}>제목</th>
                <th style={{width:'10%'}}>조회수</th>
                <th style={{width:'20%'}}>작성자</th>
            </tr>
            </thead>
            <tbody id="boardTableBody">
                <tr>
                    <td>2024-03-05 11:00:30</td>
                    <td style={{textAlign: 'left'}}>제목1</td>
                    <td>조회수</td>
                    <td>
                        <img src="" style={{width:'20px', borderRadius:'50%'}} />
                        작성자이름
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="boardListButton">
        <button type="button" onClick="myBoardList(1)">내글보기</button>
        <a href="/board/write"><button type="button">글쓰기</button></a>
    </div>


     페이지 네이션 
     <Pagination count={pageDto.count} page={pageDto.page} onChange={handleChange} />

    <div id="boardSearchBox">
        <div className="d-flex">
            <select name="" id="searchQ" style={{width:'20%'}}>
                <option value="1">제목+작성자</option>
                <option value="b.bname">제목</option>
                <option value="m.mid">작성자</option>
            </select>
            <input className="keyword" onKeyUp="enterKey()" type="text" placeholder="Search" style={{width:'50%'}}/>
            <button className="btn btn-outline-success" type="button" onClick="doSearch()" style={{width:'30%'}}>검색하기</button>
        </div>
    </div>
</div>
</div>
    </>)
}