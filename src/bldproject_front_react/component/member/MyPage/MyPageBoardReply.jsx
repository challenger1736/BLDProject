

export default function MyPageBoardReply(props){

    return(<>
     <div class="myBoardBox" style="400px; overflow-y: auto;">
                    <h3>내가 쓴 글</h3>
                    <table class="myBoardTable">
                        <colgroup>
                            <col style="width:12%"/>
                            <col style="width:68%"/>
                            <col style="width:20%"/>
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
                            <col style="width:12%"/>
                            <col style="width:68%"/>
                            <col style="width:20%"/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>게시물 번호</th>
                                <th>댓글내용</th>
                                <th>작성일자</th>
                            </tr>
                        </thead>
                        <tbody class="myWriteReply">
                            {/* {onReplyList()} */}
                        </tbody>
                    </table>
                </div>
    </>)
}