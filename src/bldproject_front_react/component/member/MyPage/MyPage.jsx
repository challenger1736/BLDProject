import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LoginInfoContext } from "../../Index";
import mypagecss from "../../../css/member/mypage.css"
import logo from '../../../img/Project_IMG/로고/logo_transparent_1080.png'
import { Link } from "react-router-dom";



export default function MyPage(props){
    let myinfoContent = document.querySelector('#mypageContentBox');
    let html= ``;

    const {loginInfo, setLoginInfo} = useContext(LoginInfoContext)
    console.log(loginInfo);
    console.log(loginInfo.mno);

    const[myinfo, setMyinfo] = useState('');

    
    const myinfoGet = (e)=>{
    axios.get('member/mypage/myinfo',{params: {mno:loginInfo.mno}})
    .then(r=>{
        console.log(r.data);
        setMyinfo(r.data);
        html = ``;

        html += `
            <div class="infoBox">
                <h3>기본정보</h3>
                <div class="infoFlexBox">
                    <img src="boardUploadIMG/${r.data.mimg}">
                    <ul>
                        <li>
                            <p>이름</p><span>${r.data.mname}</span>
                        </li>
                        <li>
                            <p>이메일</p><span>${r.data.memail}</span>
                        </li>
                        <li>
                            <p>전화번호</p><span>${r.data.mphone}</span>
                        </li>
                        <li>
                            <p>가입날짜</p><span>${r.data.cdate}</span>
                        </li>
                    </ul>
                </div>
            </div>
        `;
        myinfoContent.innerHTML = html;
    })
    .catch(error=>{console.log(error)}) 
}

    function onMyinfo(e){
        document.querySelector('.nav_btn_badge:nth-child(1)').classList.add('active');
        document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
        document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
        document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
        document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
        document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
        document.querySelector('.nav_btn_badge:nth-child(7)').classList.remove('active');
        myinfoGet();
    }

    function updateView(){ // 진짜 이 쪽 부분은 좀 귀찮아져서 못하겠다. 회원가입시 했던거 스트레스 받음.
        document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
        document.querySelector('.nav_btn_badge:nth-child(2)').classList.add('active');
        document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
        document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
        document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
        document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
        document.querySelector('.nav_btn_badge:nth-child(7)').classList.remove('active');
    
        html = ``;
    
    
            html += `
                <h3 class="updateTitle">회원정보 변경</h3>
                <form id="updateForm">
                    <ul>
                        <li>
                            <p>아이디</p>
                            <input type="text" id="mid" name="mid" value="${myinfo.mid}" readonly/>
                        </li>
                        <li>
                            <p>비밀번호</p>
                            <input type="password" id="mpw" name="mpw" placeholder="비밀번호 입력"/>
                            <span class="pwcheckbox"></span>
                        </li>
                       
                        <li>
                            <p>이름</p>
                            <input type="text" id="mname" name="mname" value="${myinfo.mname}" readonly/>
                        </li>
                        <li>
                            <p>생년월일</p>
                            <input type="text" id="mbirth" name="mbirth" value="${myinfo.mbirth}" readonly/>
                        </li>
                        <li>
                            <p>성별</p>
                            <div class="radioBox">남자<input type="radio" checked value="남자" name="msex" readonly/></div>
                            <div class="radioBox">여자<input type="radio" value="여자" name="msex" readonly/></div>
                        </li>
                        <li>
                            <p>전화번호</p>
                            <input type="text" id="mphone" name="mphone" placeholder="전화번호 입력" value="${myinfo.mphone}"/>
                        </li>
                        <li id="emailLi">
                            <p>이메일</p>
                            <div class="emailBox">
                                <input type="text" id="memail" name="memail" placeholder="이메일 입력" value="${myinfo.memail}"/>
                                <button class="send" type="button" onclick="authreq()">
                                    인증번호 발송
                                </button>
                            </div>
                            <span class="emailcheckbox"></span>
                        </li>
                        <li>
                            <p>주소</p>
                            <input type="text" id="sample3_address" class="maddress" name="maddress" placeholder="주소" value="${myinfo.maddress}">
                        </li>
                        <li class="imgBox">
                            <p>프로필 사진</p>
                            <input onchange="onChangeImg(this)" type="file" id="mimg" name="profileimg" accept="image/*"/>
                        </li>
                        <li class="priview">
                            <img id="preimg" src="boardUploadIMG/default.jpg"/>
                        </li>
                    </ul>
                    <button id="updateBtn" type="button" onclick="updateInfo()">수정 완료</button>
                    <a href="/"><button id="updatebackBtn" type="button">취소</button></a>
                </form>
            `;
        
    
        myinfoContent.innerHTML = html;
    }

    const [myboardlist, setMyboardList] = useState([]);
    // 내가 쓴 글 보기
    // 4. 내가 쓴 글 보기
function myWriteList(){
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.add('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(7)').classList.remove('active');

    axios.get('/member/mypage/boardlist',{params: {mno:loginInfo.mno}})
            .then((r)=>{console.log(r.data);
            setMyboardList(r.data.boardlist);
            setMyReplyList(r.data.replylist);
            
       
  

            html = ``;

            html += `
                <div class="myBoardBox" style="400px; overflow-y: auto;">
                    <h3>내가 쓴 글</h3>
                    <table class="myBoardTable">
                        <colgroup>
                            <col style="width:12%">
                            <col style="width:68%">
                            <col style="width:20%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>게시물 번호</th>
                                <th>제목</th>
                                <th>작성일자</th>
                            </tr>
                        </thead>
                        <tbody class="myWriteBoard">
                     
                        </tbody>
                    </table>
                </div>


                <div class="myReplyBox" style="400px; overflow-y: auto;">
                    <h3>내가 쓴 댓글</h3>
                    <table class="myReplyTable" >
                        <colgroup>
                            <col style="width:12%">
                            <col style="width:68%">
                            <col style="width:20%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>게시물 번호</th>
                                <th>댓글내용</th>
                                <th>작성일자</th>
                            </tr>
                        </thead>
                        <tbody class="myWriteReply">
                        
                        </tbody>
                    </table>
                </div>
            `;

            myinfoContent.innerHTML = html;

            let myWriteBoard = document.querySelector('.myWriteBoard');
            let htmlBoard = ``;

            r.data.boardlist.forEach((board)=>{
                htmlBoard += `
                    <tr>
                        <td>${board.bno}</td>
                        <td><a href="/board1/${board.bno}">${board.bname}</a></td>
                        <td>${board.cdate}</td>
                    </tr>
                `
            })
            myWriteBoard.innerHTML = htmlBoard;

            let myReplyeBoard = document.querySelector('.myWriteReply');
            let htmlReply = ``;

            r.data.replylist.forEach((reply)=>{
                htmlReply += `
                    <tr>
                        <td>${reply.rpno}</td>
                        <td><a href="/board1/${reply.bno}">${reply.rpcontent}</a></td>
                        <td>${reply.cdate}</td>
                    </tr>
                `
            })
            myReplyeBoard.innerHTML = htmlReply;
           
        })
    
    }
  
    const [myReplyList, setMyReplyList] = useState([]);

    const [myStoreLists, setMyStoreList] = useState([]);

    // 내 가게 출력
    function myStoreList(){
        document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
        document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
        document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
        document.querySelector('.nav_btn_badge:nth-child(4)').classList.add('active');
        document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
        document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
        document.querySelector('.nav_btn_badge:nth-child(7)').classList.remove('active');
    
            axios.get('/member/mypage/mystore', {params: {mno:loginInfo.mno}})
                .then((r)=>{console.log(r.data);
                    setMyStoreList(r.data);
                    
                    html = ``;

                    html += `
                        <div class="myStoreWrap">
                            <div class="myStoreBox">
                                <div class="myStoreContent">
                                
                                </div>
                            </div>
                            <ul class="myStoreReviewBox">
                             
                            </ul>
                        </div>
                    `;
               
    
                myinfoContent.innerHTML = html;

                let myStoreContent = document.querySelector('.myStoreContent');
                let htmlStore = ``;
    
                r.data.forEach((store)=>{
                    if(store.categorya==1){store.categorya='안산';}
                        else if(store.categorya==2){store.categorya='시흥';}
                        else if(store.categorya==3){store.categorya='수원';}
                        else if(store.categorya==4){store.categorya='부천';}
                        else if(store.categorya==5){store.categorya='안양';}
                        else if(store.categorya==6){store.categorya='서울';};
       
                        if(store.categoryb==1){store.categoryb='한식';}
                        else if(store.categoryb==2){store.categoryb='일식';}
                        else if(store.categoryb==3){store.categoryb='중식';}
                        else if(store.categoryb==4){store.categoryb='양식';}
                        else if(store.categoryb==5){store.categoryb='분식';}
                        else if(store.categoryb==6){store.categoryb='패스트푸드';}
                    htmlStore += `
                    <div class="myStoreImgBox">
                        <img src="boardUploadIMG/${store.simgName1}" style="width:100px;">
                    </div>
                    <div class="myStoreInfoBox">
                        <h5>${store.sname}<span>(${store.categorya})</span><span>(${store.categoryb})</span></h5>
                        <p>${store.scontent}</p>
                        <p>${store.snumber}</p>
                        <p>가게 상태 : ${store.sstate}</p>
                    </div>
                    `
                })
                myStoreContent.innerHTML = htmlStore;
                
                })
            
            
                   
        }
 
        const [myCouponList, setMyCouponList] =useState([]);
// 8. 내 쿠폰
function myCoupon(){
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.add('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(7)').classList.remove('active');
   
            axios.get('/member/mypage/mycoupon', {params:{mno:loginInfo.mno}})
                .then((r)=>{console.log(r.data);
                    setMyCouponList(r.data);
                    html = ``;
                    // r.data 은 받아온 쿠폰dto 의 리스트
                    r.data.forEach((result)=>{
                        if(result.categorya==1){result.categorya='안산';}
                        else if(result.categorya==2){result.categorya='시흥';}
                        else if(result.categorya==3){result.categorya='수원';}
                        else if(result.categorya==4){result.categorya='부천';}
                        else if(result.categorya==5){result.categorya='안양';}
                        else if(result.categorya==6){result.categorya='서울';};
       
                        if(result.categoryb==1){result.categoryb='한식';}
                        else if(result.categoryb==2){result.categoryb='일식';}
                        else if(result.categoryb==3){result.categoryb='중식';}
                        else if(result.categoryb==4){result.categoryb='양식';}
                        else if(result.categoryb==5){result.categoryb='분식';}
                        else if(result.categoryb==6){result.categoryb='패스트푸드';}
       
                        if(result.ckind==0){result.ckind="1000원 할인 쿠폰";}
                        else if(result.ckind==1){result.ckind="3000원 할인 쿠폰";}
                        else if(result.ckind==2){result.ckind="5000원 할인 쿠폰";}
                        else if(result.ckind==3){result.ckind="10000원 할인 쿠폰";}

                        html += `
                        <div class="cstate${result.cstate}" style="margin: 0 auto; border: 1px solid #0D0D0D; padding: 20px; margin: 20px; width: 400px; font-weight : bold; ">
                            <div class="ckind" style="font-size: 28px;">
                                ${result.ckind}
                            </div>
                            <div>
                                <h5><span>${result.categorya}</span>-<span style="margin-right: 20px;">${result.categoryb}</span></h5>
                                <h3 style="font-size: 25px;">${result.sname}</h3>
                                <p>가게 주소 : ${result.sadress}</p>
                                <p>전화번호 : ${result.sphone}</p>
                                <p>쿠폰 발급 일 : ${result.cdate.split("T")[0]}</p>
                            </div>
                        </div>
                    `;

                   
                   
                })
                myinfoContent.innerHTML = html;
                           
            })
 
        }

        
        function memberDelete(){
            document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(7)').classList.add('active');
        
            axios.get('/member/mypage/memberdelete',{params:{mno:loginInfo.mno}})
            .then((r)=>{console.log(r.data);
                if(r.data){
                    alert('탈퇴 완료')
                    window.location.href="/"
                }else{
                    alert('탈퇴 실패')
                }
            })
        
        
        }
        // 10. 회원탈퇴 기능
      



    return(<>
    <div id="mypageBox">
        <div id="mypageTitle">
            <img src={logo} style={{width:'400px'}}/>
            <h1>마이페이지</h1>
        </div>
        <ul id="mypageMenu">
            <li className="nav_btn_badge active" onClick={onMyinfo}>내 정보</li>
            <li className="nav_btn_badge" onClick={updateView}>회원정보 변경</li>
            <li className="nav_btn_badge" onClick={myWriteList}>내가 쓴 글/댓글 보기</li>
            <li className="nav_btn_badge" onClick={myStoreList}>내 가게 보기</li>
            <li className="nav_btn_badge" onClick={myCoupon}>내 쿠폰</li>
            <li className="nav_btn_badge" onClick="favorites()">즐겨찾기</li>
            <li className="nav_btn_badge" onClick={memberDelete}>탈퇴하기</li>
        </ul>
        <div id="mypageContentBox">
        <div class="infoBox">
                <h3>기본정보</h3>
                <div class="infoFlexBox">
                    <img src="boardUploadIMG/default.png"/>
                    <ul>
                        <li>
                            <p>이름</p><span>{loginInfo.mname}</span>
                        </li>
                        <li>
                            <p>이메일</p><span>{loginInfo.memail}</span>
                        </li>
                        <li>
                            <p>전화번호</p><span>{loginInfo.mphone}</span>
                        </li>
                        <li>
                            <p>가입날짜</p><span>{loginInfo.cdate}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
   
    </>)
    

}

