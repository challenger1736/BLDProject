import { useState } from "react";

export default function SignUpEmail(props){
    let emailj = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+\.+[a-z.]+$/

    return(<>
        <li id="emailLi">
            <input type="text" value={props.memail} onChange={props.emailCheck} id="memail" name="memail" placeholder="이메일 입력" />
            <button className="send" type="button" onClick={props.authreq} disabled={emailj.test(props.memail)? false: true}>
                인증 하기
            </button>
            <span className="emailcheckbox">{emailj.test(props.memail)? <p>올바른 형식입니다.</p>:<p>'@'와'.'을 포함한 이메일 형식으로 입력해주세요.</p>}</span>
        </li>
        <li className="authbox">
            {props.authMailSend? 
            <><span className="timebox">{"0"+parseInt(props.timer/60)+"분"}{parseInt(props.timer%60)<10?"0"+parseInt(props.timer%60)+"초":parseInt(props.timer%60)+"초"}</span>
            <input value={props.authNo} onChange={props.onChangeAuthNo} type="text" className="ecodeinput" disabled={props.emailInputDisable}/>
            <button onClick={props.auth} type="button" disabled={props.emailInputDisable}>인증</button></>: <></> }
        </li>
        </>)
}