import DaumPostcode from "react-daum-postcode";
import React,{useEffect, useState} from "react";

export default function RegStoreAdd(props) {
    const [saddress1,setSadress1] = useState('');
    const [saddress2,setSadress2] = useState('');
    const [saddress3,setSadress3] = useState('');
    const [saddress4,setSadress4] = useState('');

   
  
    const onChangeAd1 = (e)=>{
        setSadress1(e);
    }
    const onChangeAd2 = (e)=>{
        setSadress2(e);
    }
    const onChangeAd3 = (e)=>{
        setSadress3(e.target.value);
    }
    const onChangeAd4 = (e)=>{
        setSadress4(e.target.value);
    }

    const plusadd = ()=>{
        const total = saddress1+"/"+saddress2+"/"+saddress3+saddress4;
        console.log(total);
        props.onChangeSaddress(total);
    }

    useEffect(plusadd, [saddress1, saddress2, saddress3, saddress4])


    const searchAddress = () => {
        new window.daum.Postcode({
            oncomplete: function(data) { // 실행됐을시 oncomplete으로 data를 제공하는 콜백함수
                onChangeAd1(data.zonecode); // 직접 DOM으로 만지면 useState를 바꿀수 없었음. 어휴 
                onChangeAd2(data.address);
                document.getElementById('sample3_detailAddress').focus(); // 상세주소 입력란으로 포커스 이동
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
                <input type="text" value={saddress1} id="sample3_postcode" style={{backgroundColor:"#F2F2F2"}} placeholder="우편번호" disabled />
                <input type="button" onClick={searchAddress} value="주소 검색" />
            </div>
            <input type="text"  value={saddress2}  id="sample3_address" className="saddress" name="saddress" placeholder="주소" style={{width:'100%', backgroundColor:"#F2F2F2"}} disabled/><br/>
            <input type="text"  value={saddress3} onChange={onChangeAd3}  style={{width:'100%'}} id="sample3_detailAddress" placeholder="상세주소" />
            <input type="text"  value={saddress4} onChange={onChangeAd4}  id="sample3_extraAddress" placeholder="참고항목" />
            <div id="wrapadd" style={{ display: 'none', border: '1px solid', width: '500px', height: '300px', margin: '5px 0', position: 'relative' }}>
                <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style={{ cursor: 'pointer', position: 'absolute', right: '0px', top: '-1px', zIndex: '1' }} onClick={foldDaumPostcode} alt="접기 버튼" />
            </div> 
            <input name="saddress" value={props.saddress} readOnly style={{display:'none'}}/>
        </div>
    );
}
