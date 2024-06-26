import logo from '../img/Project_IMG/로고/logo_transparent_250.png'
import Xmark from '../img/Project_IMG/Xmark.png'
import hbgLogo from '../img/Project_IMG/arrows-hamburger_512.png'
import Headercss from '../css/header.css'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { LoginInfoContext } from './Index'
import axios from 'axios'

export default function Header(props){

    const {loginInfo, setLoginInfo} = useContext(LoginInfoContext);
    
    useEffect( ()=>{
        axios.get('/member/login/check.do')
            .then(r=>{console.log(r);
            setLoginInfo(r.data);
            })
            .catch(e=>{console.log(e)})
    },[])

    return(<>
    <div className="darkBackground" onClick={toggleMenu}></div>
    <div className="hamburgerMenu">
        <div className="hbgMTop">
            <div className="logo">
                <a href="/"><img src={logo}/></a>
            </div>
            <div>
                B L D<br/>
                <span>Breakfast Lunch Dinner</span>
            </div>
            <div>
                <img src={Xmark} onClick={toggleMenu} id="Xmark"/>
            </div>
        </div>
        <div className='hbgUnderLine'></div>
        <div id='member_service'>
            {/* JS 부분 여기다가 넣기 */}
        </div>
        <div className='hbgUnderLine'></div>
        <ul id='main_menu'>
            <li>
                <a href="/map">내 주변 맛집</a>
            </li>
            <li>
                <a href="#">지역별 인기 맛집</a>
            </li>
            <li>
                <Link to="/storelist"  onClick={toggleMenu}>등록된 음식점</Link>
            </li>
            <li>
                <Link to="/store/reg"  onClick={toggleMenu}>가게 등록하기 임시페이지</Link>
            </li>
            <li>
                <Link to="/boardlist"  onClick={toggleMenu}>게시판</Link>
            </li>
        </ul>
    </div>
    <div id='header'>
        <div id='gnv'>
            <div className='headerLogos'>
                <div id="hamburger">
                    <img src={hbgLogo} onClick={toggleMenu}/>
                </div>
                <div className='logo'>
                    <Link to="/"><img src={logo}/></Link>
                </div>
            </div>
            <div className="headerLoginpart">
                {loginInfo==''?<>
                <div>
                    <Link to="/login">로그인</Link>
                </div>
                <div>
                    <Link to="/signup">회원가입</Link>
                </div>
                </>
                :<>
                <div>
                    <Link to="/mypage">마이 페이지</Link>
                </div>
                <div>
                    <a href="javascript:void(0)" onClick={logout}>로그아웃</a>
                </div>
                </>
                }
            </div>
        </div>
        
    </div>
    </>)

}

function toggleMenu(){
    let menu = document.querySelector('.hamburgerMenu');
    menu.classList.toggle('active');

    let dark = document.querySelector('.darkBackground');
    dark.classList.toggle('active')
}

function logout(props){
    axios.get('/member/logout.do')
        .then(r=>{console.log(r);
            if(r){alert('로그아웃 성공'); window.location.href="/"}
            else{alert('로그아웃 실패')}
        })
        .catch(e=>{console.log(e)})
}