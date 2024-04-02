import logo from "../../img/Project_IMG/로고/logo_transparent_250.png"
import { useState } from "react";
import SignUpId from "./SignUpId";
import axios from "axios";
import SignUpPw from "./SignUpPw";
import SignUpEmail from "./SignUpEmail";
import SignUpAddr from "./SignUpAddr";
import SignUpImg from "./SignUpImg";


let checkArray = [false,false,false,false,false,false];

export default function SignUp2(props){

    // 1. 상태변수
    const [mid, setMid] = useState('');
    const [mpw, setMpw] = useState('');
    const [mpwC, setMpwC] = useState('');
    const [mname, setMname] = useState('');
    const [mbirth, setMbirth] = useState('');
    const [msex, setMsex] = useState('');
    const [mphone, setMphone] = useState('');
    const [memail, setMemail] = useState('');
    const [maddress, setMadress] = useState('');
    const [mimg, setMimg] = useState('');

    // State 수정(렌더링)
    // mid
    // mid 수정함수.
     const onChangeMid = (e)=>{
        setMid(e.target.value);
    }

    // mid 중복검사
    const onMidCheck = (e)=>{
        axios.get('/member/signup/idcheck?mid='+mid)
            .then((r)=>{console.log(r);
                if(r){
                    alert('사용가능한 아이디입니다.');
                    checkArray[0] = true;
                }else{
                    alert('중복된 아이디입니다.')
                }
            })
    }
    // mid false 만드는 함수
    const checkArray0false = (e)=>{
        checkArray[0] = false;
    }

    // mpw
    // 수정함수
    const onChangeMpw = (e) =>{
        setMpw(e.target.value);
    }
    // 비밀번호 false 함수
    const checkArray1false = (e)=>{
        checkArray[1] = false;
    }
    // mpwC
    // 수정함수
    const onChangeMpwC = (e) =>{
        setMpwC(e.target.value);
    }
    // 비밀번호 true 함수
    const checkArray1true = (e)=>{
        checkArray[1] = true;
    }
    // 이름
    // 수정함수
    const onChangeMname = (e)=>{
        setMname(e.target.value);
    }
    // 생년월일
    // 수정함수
    const onChangeMbirth = (e) => {
        let input = e.target.value;
        if(input.length>10){
            console.log(checkArray[2])
            return;
        }
        checkArray[2]=false;
        console.log(checkArray[2])
        // "-"를 추가할 위치에 "-"를 삽입
        if (input.length === 4 || input.length === 7) {
          input += '-';
        }
        if(input.length===10){
            console.log(checkArray[2]);
            checkArray[2]=true;
        }
        
        
        // 변경된 값으로 상태 업데이트
        setMbirth(input);
      };
    // 성별
    const onChangeMsex = (e) => {
        checkArray[3]=true;
        console.log(e.target.value)
        setMsex(e.target.value) 
        
    }
    // 휴대폰
    // 수정함수
    const phoneCheck=(e)=>{
        let input = e.target.value;
        if(input.length>13){
            return;
        }
        console.log(checkArray[2])
        // "-"를 추가할 위치에 "-"를 삽입
        if (input.length === 3 && input.length > mphone.length|| input.length === 7 && input.length > mphone.length) {
            input += '-';
            
          }
        if(input.length===13){
            input = input.replaceAll('-','');
            input = input.slice(0, 3) + '-' + input.slice(3,7)+'-'+input.slice(7);
            
        }
        if(input.length==13||input.length==12){
            checkArray[4]=true;
        }
        
        setMphone(input)
        let phonej = /^([0-9]{2,3})+[-]+([0-9]{3,4})+[-]+([0-9]{4})+$/ // 안쓰긴함.

    }
    //이메일
    // 수정함수
    const emailCheck=(e)=>{
        setMemail(e.target.value);
    }
    // 이메일 인증번호 보내기 함수
    let authMailSend = false; // 보내면 true로 됨.


    const authreq=(e)=>{
        axios.get("/auth/email/req?email="+memail)
            .then((r)=>{if(r){
                authMailSend = true;
                alert('인증번호 전송 완료.')
            }else{
                alert('인증번호 전송 실패.')
            }
        })
    }
    // 인증번호 인풋 아예 없애버리게 authMailSend=false해주는 함수 구현
    
    const authMailSendfalse = (e)=>{
        authMailSend = false;
    }
    // 실제 번호와 맞는지 비교 함수
    const [authNo, setAuthNo] = useState('')
    const onChangeAuthNo=(e)=>{
        setAuthNo(e.target.value)
    }
    let emailInputDisable = false
    const auth = (e)=>{
        //authNo가 axios 랑 통신한 놈과 같은지 확인.
        axios.get('auth/email/check?authNo='+authNo)
            .then((r)=>{if(r){
                emailInputDisable = true
                checkArray[5]=true;
                alert('인증 성공')}
            else{alert('인증 실패')}
        })
    }


    return(<>
        <div id="signupBox">
        <div id="signupTitle">
            <img src={logo}/>
            <h1>회원가입</h1>
        </div>
        <form id="signupForm">
            <ul>
                <SignUpId onChangeMid={onChangeMid} mid={mid} onMidCheck={onMidCheck} checkArray0false={checkArray0false}/>
                <SignUpPw onChangeMpw={onChangeMpw} onChangeMpwC={onChangeMpwC} mpw={mpw} mpwC={mpwC} checkArray1false={checkArray1false} checkArray1true={checkArray1true}/>
                <li>
                    <input type="text" value={mname} onChange={onChangeMname} id="mname" name="mname" placeholder="이름 입력"/>
                </li>
                <li>
                    <p>생년월일</p>
                    <input type="text" value={mbirth} onChange={onChangeMbirth} id="mbirth" name="mbirth" placeholder="생년월일 / 2000-01-01 입력"/>
                </li>
                <li>
                    <p>성별</p>
                    <div className="radioBox">남자<input type="radio" value="남자" onChange={onChangeMsex} name="msex"/></div>
                    <div className="radioBox">여자<input type="radio" value="여자" onChange={onChangeMsex} name="msex"/></div>
                </li>
                <li>
                    <input type="text" value={mphone} onChange={phoneCheck} id="mphone" name="mphone" placeholder="전화번호 입력"/>
                    <span className="phonecheckbox"></span>
                </li>
                <SignUpEmail 
                emailCheck={emailCheck} 
                memail={memail} 
                authreq={authreq} 
                authMailSend={authMailSend} 
                authMailSendfalse={authMailSendfalse} 
                authNo={authNo} 
                onChangeAuthNo={onChangeAuthNo}
                auth={auth}
                emailInputDisable={emailInputDisable}/>
                <SignUpAddr />
                <SignUpImg />

            </ul>
            {/* <button id="signupBtn" type="button" onClick={signup}>회원가입</button>
            <button id="signupbackBtn" type="button" onClick={signupBack}>취소</button> */}
        </form>
    </div>
    </>)
}