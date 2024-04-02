import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Login from "./member/Login";
import SignUp2 from "./member/SignUp2";


export default function Index(props){

    return(<>
    <BrowserRouter>
        <div id="wrap">
        <Header/>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<SignUp2/>}/>
            </Routes>
        <Footer/>
        </div>
    </BrowserRouter>
    
    </>)
    

}