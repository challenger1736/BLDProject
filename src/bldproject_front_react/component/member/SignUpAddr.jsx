import DaumPostcode from "react-daum-postcode";
import React,{useEffect, useState} from "react";

export default function SignUpAddr(props) {
    const [maddress1,setMadress1] = useState('');
    const [maddress2,setMadress2] = useState('');
    const [maddress3,setMadress3] = useState('');
    const [maddress4,setMadress4] = useState('');

   
  
    const onChangeAd1 = (e)=>{
        setMadress1(e);
    }
    const onChangeAd2 = (e)=>{
        setMadress2(e);
    }
    const onChangeAd3 = (e)=>{
        setMadress3(e.target.value);
    }
    const onChangeAd4 = (e)=>{
        setMadress4(e.target.value);
    }

    const plusadd = ()=>{
        const total = maddress1+"/"+maddress2+"/"+maddress3+maddress4;
        console.log(total);
        props.onChangeMaddress(total);
    }

    useEffect(plusadd, [maddress1, maddress2, maddress3, maddress4])


    const searchAddress = () => {
        new window.daum.Postcode({
            oncomplete: function(data) { // 실행됐을시 oncomplete으로 data를 제공하는 콜백함수
                onChangeAd1(data.zonecode); // 직접 DOM으로 만지면 useState를 바꿀수 없었음. 어휴 
                onChangeAd2(data.address);
                document.getElementById('sample3_detailAddress').focus(); // 상세주소 입력란으로 포커스 이동
                props.checkArray6true();
            }
        }).open();
    };

    const foldDaumPostcode = () => {
        const element_wrapadd = document.getElementById('wrapadd');
        element_wrapadd.style.display = 'none';
    };

    return (
        <div>
            <p>주소</p>
            <div id="zipCode">
                <input type="text" value={maddress1} id="sample3_postcode" style={{backgroundColor:"#F2F2F2"}} placeholder="우편번호" disabled />
                <input type="button" onClick={searchAddress} value="주소 검색" />
            </div>
            <input type="text"  value={maddress2}  id="sample3_address" className="maddress" name="maddress" placeholder="주소" style={{backgroundColor:"#F2F2F2"}} disabled/>
            <input type="text"  value={maddress3} onChange={onChangeAd3}  id="sample3_detailAddress" placeholder="상세주소" />
            <input type="text"  value={maddress4} onChange={onChangeAd4}  id="sample3_extraAddress" placeholder="참고항목" />
            <div id="wrapadd" style={{ display: 'none', border: '1px solid', width: '500px', height: '300px', margin: '5px 0', position: 'relative' }}>
                <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style={{ cursor: 'pointer', position: 'absolute', right: '0px', top: '-1px', zIndex: '1' }} onClick={foldDaumPostcode} alt="접기 버튼" />
            </div> 
            <input name="maddress" value={props.maddress} readOnly style={{display:'none'}}/>
        </div>
    );
}
