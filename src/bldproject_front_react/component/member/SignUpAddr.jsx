import DaumPostcode from "react-daum-postcode";
import React,{useState} from "react";

export default function SignUpAddr() {
    const searchAddress = () => {
        new window.daum.Postcode({
            oncomplete: function(data) { // 실행됐을시 oncomplete으로 data를 제공하는 콜백함수
                document.getElementById('sample3_postcode').value = data.zonecode; // 우편번호
                document.getElementById('sample3_address').value = data.address; // 주소
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
                <input type="text" id="sample3_postcode" style={{backgroundColor:"#F2F2F2"}} placeholder="우편번호" readOnly />
                <input type="button" onClick={searchAddress} value="주소 검색" />
            </div>
            <input type="text" id="sample3_address" className="maddress" name="maddress" placeholder="주소" style={{backgroundColor:"#F2F2F2"}} readOnly/>
            <input type="text" id="sample3_detailAddress" placeholder="상세주소" />
            <input type="text" id="sample3_extraAddress" placeholder="참고항목" />
            <div id="wrapadd" style={{ display: 'none', border: '1px solid', width: '500px', height: '300px', margin: '5px 0', position: 'relative' }}>
                <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style={{ cursor: 'pointer', position: 'absolute', right: '0px', top: '-1px', zIndex: '1' }} onClick={foldDaumPostcode} alt="접기 버튼" />
            </div>
        </div>
    );
}
