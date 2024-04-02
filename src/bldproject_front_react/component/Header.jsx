import logo from '../img/Project_IMG/로고/logo_transparent_250.png'
import Xmark from '../img/Project_IMG/Xmark.png'
import hbgLogo from '../img/Project_IMG/arrows-hamburger_512.png'
import Headercss from '../css/header.css'
import { Link } from 'react-router-dom'

export default function Header(props){


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
                <a href="#">추천 맛집</a>
            </li>
            <li>
                <a href="/map">내 주변 맛집</a>
            </li>
            <li>
                <a href="#">지역별 인기 맛집</a>
            </li>
            <li>
                <a href="#">등록 된 음식점</a>
            </li>
            <li>
                <a href="#">게시판</a>
            </li>
            <li>
                <a href="#">맛집 모임</a>
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
                <div>
                    <Link to="/login">로그인</Link>
                </div>
                <div>
                    <Link to="/signup">회원가입</Link>
                </div>
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