import { useRef, useState } from "react";
import RegStoreAdd from "./RegStoreAdd";
import axios from "axios";
import regstorecss from "../../css/store/regstore.css";
import logo from "../../img/default.jpg";

export default function RegStore(props){

    //1. 상태변수
    // const [sname, setSname] = useState('');
    // const [sphone, setSphone] = useState('');
    const [saddress, setSadress] = useState('');
    // const [scontent, setScontent] = useState('');
    // const [snumber, setSnumber] = useState('');
    // const [categorya, setCategorya] = useState('');
    // const [categoryb, setCategoryb] = useState('');
    // 폼으로 그냥 해보자
    const storeRegFormRef = useRef();

    const onReg = (e)=>{
        axios.post('/store/reg.do', storeRegFormRef.current)
            .then(response =>{console.log(response)
                if(response.data>0){
                    alert('가게등록 성공')
                    window.location.href="/"
                }else if(response.data==-1){
                    alert('로그인 후 가능합니다')
                }else{
                    alert('가게등록 실패')
                }
            })
    }


    const onChangeSaddress=(e)=>{
        setSadress(e);
        console.log(saddress);
    }

    function onChangeStoreImg1(se){
        console.log(se);
        let fileReader= new FileReader();
        fileReader.readAsDataURL(se.target.files[0]);
        fileReader.onload = se2 => {
        document.querySelector('#storePreimg1').src = se2.target.result
        }
    }

    function onChangeStoreImg2(se){
        let fileReader= new FileReader();
        fileReader.readAsDataURL(se.target.files[0]);
        fileReader.onload = se2 => {
        document.querySelector('#storePreimg2').src = se2.target.result
        }
    }

    function onChangeStoreImg3(se){
        let fileReader= new FileReader();
        fileReader.readAsDataURL(se.target.files[0]);
        fileReader.onload = se2 => {
        document.querySelector('#storePreimg3').src = se2.target.result
        }
    }

    function onChangeStoreImg4(se){
        let fileReader= new FileReader();
        fileReader.readAsDataURL(se.target.files[0]);
        fileReader.onload = se2 => {
        document.querySelector('#storePreimg4').src = se2.target.result
        }
    }


    return(<>
    <div className="storeWrap">
    <h1>가게 등록 </h1>
        <form id="storeRegForm" ref={storeRegFormRef}>
        <ul className="storeUl">
            <li>
                <p>가게이름</p>
                <input type="text" id="sname" name="sname"/><br/>
                <div className="namebox snameCheckBox"> </div>
            </li>
            <li>
                <p>전화번호</p>
                <input type="text" id="sphone" name="sphone"/><br/>
                <div className="phnoebox sphonecheckbox"></div>
            </li>
            <li>
                <RegStoreAdd
                onChangeSaddress={onChangeSaddress}
                saddress={saddress}/>
            </li>

            <li>
                <p> 가게 설명 </p>
                <input type="text" id="scontent" name="scontent"/><br/>
            </li>
            <li>
                <p> 사업자 번호 12자리(000-00-00000)</p>
                <input type="text" id="snumber" name="snumber"/><br/>
            </li>
            <li>
                <p> 지역 선택</p>
                <select id="categorya" name="categorya">
                    <option value="2"> 안산 </option>
                    <option value="3"> 시흥 </option>
                    <option value="4"> 수원 </option>
                    <option value="5"> 부천 </option>
                    <option value="6"> 안양 </option>
                    <option value="7"> 서울 </option>
                </select>
            </li>
            <li>
        <p> 음식 분류</p>
                <select id="categoryb" name="categoryb">
                    <option value="1">한식</option>
                    <option value="2">일식</option>
                    <option value="3">중식</option>
                    <option value="4">양식</option>
                    <option value="5">분식</option>
                    <option value="6">패스트푸드</option>
                </select>
            </li>
            <li>
                <p>대표이미지</p>
                <input onChange={onChangeStoreImg1} type="file" className="regimg" id="simg1"name="simg1" accept="/image/*"/><br/>
                <div className="simg1 "><img id="storePreimg1" className ="storePreimg" src={logo}/></div>
            </li>
            <li>
                <p> 이미지2 </p>
                <input onChange={onChangeStoreImg2} type="file" className="regimg" id="simg2"name="simg2" accept="/image/*"/><br/>
                <div className="simg2 "><img id="storePreimg2" className ="storePreimg" src={logo}/></div>
            </li>
            <li>
            <p> 이미지3 </p>
                <input onChange={onChangeStoreImg3} type="file" className="regimg" id="simg3"name="simg3" accept="/image/*"/><br/>
                <div className="simg3 "><img id="storePreimg3" className ="storePreimg" src={logo}/></div>
            </li>
            <li> 
            <p> 이미지4 </p>
                <input onChange={onChangeStoreImg4} type="file" className="regimg" id="simg4"name="simg4" accept="/image/*"/><br/>
                <div className="simg4 "><img id="storePreimg4" className ="storePreimg" src={logo}/></div>
            </li>

        </ul>
            <button className="regStorebtn" type="button" onClick={onReg}> 가게등록</button><br/>
        </form>
    </div>
    </>)
}