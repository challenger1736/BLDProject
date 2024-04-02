import { useState } from "react";

export default function SignUpPw(props){
    // 정규표현식 : 영대소문자1개이상+숫자1개이상 8~13자리
    let pwj = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,13}$/
    props.checkArray1false();
    if(props.mpw==props.mpwC){
        props.checkArray1true();
    }

    return(<>
        <li>
            <input type="password" value={props.mpw} onChange={props.onChangeMpw} id="mpw" name="mpw" placeholder="비밀번호 입력"/>
            <span className="pwcheckbox">{pwj.test(props.mpw)? <p>사용 가능한 비밀번호입니다.</p>: <p id="NoticeRed">영대소문자1개이상+숫자1개이상 8~13자리 글자로 입력해주세요.</p>}</span>
        </li>
        <li>
            <input type="password" value={props.mpwC} onChange={props.onChangeMpwC} id="mpwconfirm" name="mpwconfirm" placeholder="비밀번호 재입력"/>
            <span className="pwconfirmcheckbox">{props.mpw==props.mpwC? <p>비밀번호가 일치합니다.</p>:<p id="NoticeRed">비밀번호가 일치하지 않습니다.</p>}</span>
        </li>
    </>)
}