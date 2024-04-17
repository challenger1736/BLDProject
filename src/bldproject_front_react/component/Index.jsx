import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Login from "./member/Login";
import SignUp2 from "./member/SignUp2";
import React, { useState } from "react";
import MyPage from "./member/MyPage/MyPage";
import BoardList from "./board/BoardList";
import BoardWrite from "./board/BoardWrite";
import App from "./board/App";
import Board1View from "./board/Board1View";
import Board1Update from "./board/Board1Update";
import RegStore from "./store/RegStore";
import StoreList from "./store/StoreList";

// ============ 컨텍스트 만들기 ============= //
// 1. React.createContext( 초기값 ) 이용한 컨텍스트 선언  // import React from "react";
export const LoginInfoContext = React.createContext('');
// 2. Provider 컴포넌트 이용한 해당 컨텍스트를 사용할 컴넌트들을 감싼다.
// 3. 컨텍스트 사용할 컴포넌트에서 컨텍스트를 호출한다.
    // 외부에서 해당 컨텍스트를 사용할수 있도록 export 한다.

export default function Index(props){
    const [ loginInfo , setLoginInfo ] = useState(''); 

    return(<>
    <LoginInfoContext.Provider  value={ { loginInfo , setLoginInfo } }>
        <BrowserRouter>
            <div id="wrap">
            <Header/>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/signup" element={<SignUp2/>}/>
                    <Route path="/mypage" element={<MyPage />}/>
                    <Route path="/boardlist" element={<BoardList />}/>
                    <Route path="/board/write" element={<BoardWrite/>}/>
                    <Route path="/board1/:bno" element={<Board1View />}/>
                    <Route path="/board/update/:bno" element={<Board1Update/>}/>
                    <Route path="/store/reg" element={<RegStore />}/>
                    <Route path="/storelist" element={<StoreList />}/>
                </Routes>
            <Footer/>
            </div>
        </BrowserRouter>
    </LoginInfoContext.Provider>
    </>)
    

}