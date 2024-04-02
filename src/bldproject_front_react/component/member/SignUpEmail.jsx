import { useState } from "react";

export default function SignUpEmail(props){
    let emailj = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+\.+[a-z.]+$/
    const [timer, setTimer] = useState(180);
    let m = parseInt(timer/60); //분
    let s = parseInt(timer%60); //분을 제외한 초
    m = m < 10? "0"+m : m; // 8분 -> 08분
    s = s < 10? "0"+s : s; // 3초 -> 03초


    // 타이머 함수 실행
    // 10. 타이머 함수
    const ontimer=(e)=>{
    // 테스트
        // 정의 : setInterval(함수, 밀리초) : 특정 밀리초마다 함수 실행.
        // 종료 : clearInterval(종료할Interval변수) : 종료할 Interval의 변수 대입.
    //let time = 0;
        let timerInter = setInterval(()=>{
        // setInterval() 함수는 JavaScript에서 주어진 시간 간격마다
        // 함수를 반복적으로 실행하는 역할을 합니다.
        // 예시 >  setInterval(function() { console.log('반복 실행되는 함수');}, 1000)
        // 멈추기 = clearInterval(setInterval변수명)
    
        // 1. 현재 날짜/시간
        //    let today = new Date();
        // 2. 타이머 리미트
    
        // 2-1 .이 타이머를 분 초로 나누기,
       
        // 2-2. 시간을 두 자릿수로 표현
        
        // 2-3. 출력
        // 2-4. 초 감소
        timer--;
        setTimer(timer);
        // 2-5. 만약에 초가 0보다 작아지면
        if(timer<0){    //
            clearInterval(timerInter); // 이거 멈추려고 함수를 timerInter라는 변수에 저장해 둠
            props.authMailSendfalse();
    
        }
    
    },1000);
    
}

if(props.authMailSend){
    timer = 180;
    ontimer()
}
    return(<>
        <li id="emailLi">
            <input type="text" value={props.memail} onChange={props.emailCheck} id="memail" name="memail" placeholder="이메일 입력" />
            <button className="send" type="button" onClick={props.authreq} disabled={emailj.test(props.memail)? false: true}>
                인증번호 발송
            </button>
            <span className="emailcheckbox">{emailj.test(props.memail)? <p>올바른 형식입니다.</p>:<p>'@'와'.'을 포함한 이메일 형식으로 입력해주세요.</p>}</span>
        </li>
        <li className="authbox">
            {props.authMailSend? 
            <><span className="timebox"> {m}분{s}초 </span>
            <input value={props.authNo} onChange={props.onChangeAuthNo} type="text" className="ecodeinput" disabled={props.emailInputDisable}/>
            <button onClick={props.auth} type="button" disabled={props.emailInputDisable}>인증</button></>: <></> }
        </li>
        </>)
}