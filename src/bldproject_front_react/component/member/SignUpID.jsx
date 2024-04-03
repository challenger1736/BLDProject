
export default function SignUpId(props){
    // 정규표현식 : 영소문자+숫자5~12
    let idj = /^[a-z0-9]{5,12}$/
    
    

    return(<>
        <li>
            <input type="text" value={props.mid} onChange={props.onChangeMid} id="mid" name="mid" placeholder="아이디 입력"/>{idj.test(props.mid)?<button type="button" onClick={props.onMidCheck}>중복 확인</button>:<button disabled>중복 확인</button>}
            <span className="idcheckbox">{idj.test(props.mid)? <p>ㅤ</p>: <p id="NoticeRed">영소문자+숫자 조합의 5~12글자로 입력해주세요.</p>}</span>
            
        </li>   
    </>)
}