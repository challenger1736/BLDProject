import Pagination from '@mui/material/Pagination';
import storelistcss from "../../css/store/storelist.css";
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

// 가게 리스트 페이지 출력( 승인된 것들 만 )
export default function StoreList(){

    const [pageDto, setPageDto] = useState({page:1,count:0,data:[],categorya:0,categoryb:0}) // page 1페이지 , count : 볼 총 페이지 네이션 수, data : 받아올 데이터들
    const [recodeview, setRecodeview] = useState(5);
    const [render, setRender] = useState('');

    const handleChange = (event : e, value: value) =>{
        pageDto.page = value;
        setPageDto({...pageDto});
    }

    const getStoreList = () =>{
        const info = {page:pageDto.page, categorya:pageDto.categorya, categoryb:pageDto.categoryb, recordview:recodeview}
        axios.get('/store/list.do',{params:info})
            .then(response=>{
                console.log(response);
                console.log(response.data);
                setPageDto(response.data);
            })
            .catch(error=>{console.log(error)})
    }

    useEffect(()=>{
        getStoreList()
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
        <div className="storeViewBox">
        <div className="storeTopEtc">
            <h1 className="storeTitle">음식점 목록</h1>
            <div hidden="hidden">
                <select className="pageStoreSize" onChange={onRecodeview} >
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                </select>
            </div>
        </div>
        <div id="smallHeader">
            <div id=" categoryBox">
            <select onChange={onCategoryAChoose} name="categorya" className="storeBtnBox" id="storeBtnBox1">
                <option value="0">전체</option>
                <option value="1">안산</option>
                <option value="2">시흥</option>
                <option value="3">수원</option>
                <option value="4">부천</option>
                <option value="5">안양</option>
                <option value="6">서울</option>
            </select>
            <select onChange={onCategoryBChoose} name="categoryb" className="storeBtnBox" id="storeBtnBox2">
                <option value="0">전체</option>
                <option value="1">한식</option>
                <option value="2">일식</option>
                <option value="3">중식</option>
                <option value="4">양식</option>
                <option value="5">분식</option>
                <option value="6">패스트푸드</option>
            </select>
            </div>
            <Link to="/store/reg"><button className="storeBtn"  id="regStore">가게등록 </button></Link>
        </div>
        
        <div className="storeList">
        {pageDto.data.map((store)=>{
            let link = "/store1/"+store.sno;
            let src = "/boardUploadIMG/"+store.simgName1
            return(<>
                <div class="store">
                                    <div class="simg1 storeBox" name="simg1">
                                    <img class="simg1" src={src}/> </div>
                                    <div class="sname storeBox" name="sname"> {store.sname}</div>
                                    <div class="categorya storeBox" name="categorya"> {store.categorya} </div>
                                    <div class="categoryb storeBox" name="categoryb"> {store.categoryb} </div>
                                    <a href={link}></a>
                            </div>

            </>)
        })}
        </div>
        <nav aria-label="Page navigation example">
            <div className="pagination">
            <Pagination count={pageDto.count} page={pageDto.page} onChange={handleChange} />
            </div>
        </nav>
        {/* <div className="StoreSearchBox">
            <select className="key">           
                <option value="sname">가게이름</option>
                <option value="scontent">가게설명</option>
            </select>
            <input className="keyword"/>    
            <button className="storeBtn" type="button" onclick="doStoreSearch()">검색</button>
        </div> */}
        </div>
    </>)
}