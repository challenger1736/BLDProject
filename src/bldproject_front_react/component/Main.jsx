import Maincss from '../css/main.css'

export default function Main(props){
    
    return(<>
        <div id="content">
        <div className="outer">
            <div className="inner-list">
                <div className="inner">
                    <img src="/img/한식.png" alt="이미지 1"/>
                </div>
                <div className="inner">
                    <img src="/img/일식.png" alt="이미지 2"/>
                </div>
                <div className="inner">
                    <img src="/img/중식.png" alt="이미지 3"/>
                </div>
                <div className="inner">
                    <img src="/img/양식.png" alt="이미지 4"/>
                </div>
                <div className="inner">
                    <img src="/img/분식.png" alt="이미지 5"/>
                </div>
                <div className="inner">
                    <img src="/img/패스트푸드.png" alt="이미지 6"/>
                </div>
            </div>
            <div className="button-list">
                <button className="button-left">{'<'}</button>
                <button className="button-right">{'>'}</button>
            </div>
        </div>
        
        <div id="content_box">
            <div className="box">
                <h2 className="boxTitle"> 주변 맛집 지도로 알아보기! </h2>
                <div className="mainMapBox">
                    <img src="/img/mainMapImg.png" alt="mainMapImg"/>
                    <a href="/map"></a>
                </div>
            </div>
            <div className="box">
                <h2 className="boxTitle">추천 맛집</h2>
                <ul className="suggestion">

                </ul>
            </div>
            <div className="box">
                <h2 className="boxTitle">주변 맛집</h2>
                <ul id = "nearRestaurant">

                </ul>
            </div>
            <div className="box">
                <a href="/board/list">
                    <h2 className="boxTitle">
                        전체 게시판
                    </h2>
                </a>
                <table>
                    <thead>
                    <tr className="table-info">
                        <th >등록일자</th>
                        <th >제목</th>
                        <th >조회수</th>
                        <th >작성자</th>
                    </tr>
                    </thead>
                    <tbody id="boardTableBody1">
                    <tr>
                        <td>2024-03-05 11:00:30</td>
                        <td>제목1</td>
                        <td>조회수</td>
                        <td>
                            <img src="" />
                            작성자이름
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="box">
                <h2 className="boxTitle">인기 글</h2>
                <table>
                    <thead>
                    <tr className="table-info">
                        <th >등록일자</th>
                        <th >제목</th>
                        <th >조회수</th>
                        <th >작성자</th>
                    </tr>
                    </thead>
                    <tbody id="boardTableBody2">
                    <tr>
                        <td>2024-03-05 11:00:30</td>
                        <td >제목1</td>
                        <td>조회수</td>
                        <td>
                            <img src="" />
                            작성자이름
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>)
}