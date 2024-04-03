import axios from "axios";
import logincss from '../../css/member/login.css'
import logo from '../../img/Project_IMG/로고/logo_transparent_1080.png'

export default function Login(props){

    // 1. 로그인 요청 함수.
    const onLogin = ()=> {
        // 1. 전송할 폼 가져온다.
        const loginForm = document.querySelector('#loginForm');
        // 2. 데이터폼으로 변환 통신하기 위해서
        const loginFormData = new FormData(loginForm);
        console.log(loginForm);
        console.log(loginFormData);
        // 3. 서버와 통신
        axios.post('/member/login.do', loginFormData)
            .then((r)=>{console.log(r)
                if(r.data){
                    alert('로그인 성공');
                    window.location.href= "/";
                }else{
                    alert('로그인 실패');
                }
            })
            .catch((e)=>{console.log(e)})
    }

    const handleKeyUp = (event) => {
        if (event.keyCode === 13) {
          // 엔터 키가 눌렸을 때 실행될 동작을 여기에 작성
          console.log('Enter key pressed');
          onLogin();
        }
      }

    return(<>
    <div id="loginBox">
        <div id="loginTitle">
            <img src={logo}/>
            <h1>로그인</h1>
        </div>
        <form id="loginForm">
            <ul>
                <li>
                    <input type="text" id="loginId" name="mid" placeholder="아이디 입력" onKeyUp={handleKeyUp}/>
                </li>
                <li>
                    <input type="password" id="loginPw" name="mpw" placeholder="비밀번호 입력" onKeyUp={handleKeyUp}/>
                </li>
            </ul>
            <button id="loginBtn" type="button" onClick={onLogin}>로그인</button>
            <a href="/member/signup">
                <button id="signupgoBtn" type="button">
                    회원가입
                </button>
            </a>
        </form>
    </div>
    </>)
}

