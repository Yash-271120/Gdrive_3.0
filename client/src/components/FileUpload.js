import React,{useState} from 'react'
import axios from 'axios'
import "./FileUpload.css"

const FileUpload = ({contract, account, provider}) => {

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(file){
      try {
        const formData = new FormData();
        formData.append('file',file);

        const URL = process.env.REACT_APP_PINATA_BASE_URL+'/pinning/pinFileToIPFS';
        const resFile = await axios({
          method:'POST',
          url:URL,
          data:formData,
          headers:{
            'Content-Type':`multipart/form-data`,
            pinata_api_key:process.env.REACT_APP_PINATA_API_KEY,
            pinata_secret_api_key:process.env.REACT_APP_PINATA_SECRET_API_KEY
          }
        })
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        await contract.add(account,ImgHash);
        alert("Image uploaded to Pinata");
        setFileName('No Image Selected');
        setFile(null);
      } catch (error) {
        alert("Unable to upload image to Pinata");
      }
    }
  }

  const retrieveFile = (e)=>{
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = ()=>{
      setFile(e.target.files[0]);
    }
    setFileName(e.target.files[0].name);
    e.preventDefault();
  }
  const [file,setFile] = useState(null);
  const [fileName,setFileName] = useState('No Image Selected');
  return (
    <div className='top'>
      <form className='form' onSubmit={handleSubmit}>
        <label className="choose" htmlFor="file-upload">Choose Image</label>
        <input id='file-upload' type='file' name='data' disabled={!account} className='file' onChange={retrieveFile} />
        <span className='textArea'>Image: {fileName}</span>
        <button type='submit' className='upload' disabled={!file}>Upload File</button>
      </form>
    </div>
  )
}

export default FileUpload