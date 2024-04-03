import { useState } from 'react';
import defaultImg from '../../img/default.jpg'

export default function SignUpImg(props){
    const [previewImageUrl, setPreviewImageUrl] = useState(null);
    const [filename, setFilename] = useState('');
    const onChangeImg = (e)=>{
        if (!e.target.files[0]) {
            // 파일이 선택되지 않은 경우 처리
            setPreviewImageUrl(null); 
            return;
          }
        let fileReader = new FileReader();
        console.log(e);
        fileReader.readAsDataURL(e.target.files[0]);
        setFilename(e.target.files[0].name);
        fileReader.onloadend = e => {
            setPreviewImageUrl(fileReader.result);
            
            
        }
   
    }
    const onChangeFilename = (e)=>{
        setFilename(filename);
    }
    
    return(<>
        <li>
            <p>프로필 사진</p>
            <input onChange={onChangeImg} type="file" id="mimg"  accept="image/*"/>
            <input name="mimg" value={filename||'default.jpg'} readOnly style={{display:'none'}}/>
        </li>
        <li className="priview">
            <img  id="preimg" src={previewImageUrl||defaultImg} style={{width:'300px', borderRadius : '50px'}}/>
        </li>
    </>)
    
}