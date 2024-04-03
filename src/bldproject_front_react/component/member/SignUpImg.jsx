import { useState } from 'react';
import defaultImg from '../../img/default.jpg'

export default function SignUpImg(props){
    const [previewImageUrl, setPreviewImageUrl] = useState(null);
    
    const onChangeImg = (e)=>{
        if (!e.target.files[0]) {
            // 파일이 선택되지 않은 경우 처리
            setPreviewImageUrl(null);   
            return;
          }
        let fileReader = new FileReader();
        console.log(e);
        fileReader.readAsDataURL(e.target.files[0]);
    
        fileReader.onloadend = e => {
            setPreviewImageUrl(fileReader.result);
        }
   
    }
    return(<>
        <li>
            <p>프로필 사진</p>
            <input onChange={onChangeImg} type="file" id="mimg" name="profileimg" accept="image/*"/>
        </li>
        <li className="priview">
            <img id="preimg" src={previewImageUrl||defaultImg} style={{width:'300px', borderRadius : '50px'}}/>
        </li>
    </>)
    
}