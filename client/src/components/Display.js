import React,{useState} from 'react'
import "./Display.css"

const Display = ({account,contract}) => {
  const [data,setData] = useState("");
  const getdata = async()=>{
    try {
      let dataArray;
    const otherAddress = document.querySelector('.address').value;
    if(otherAddress){
      dataArray = await contract.displayImages(otherAddress);
    }else{
      dataArray = await contract.displayImages(account);
    }

    if(dataArray.length===0){
      alert("No images to display");
    }else{
      const images = dataArray.map((item,index)=>{
        const pinataGatewayURL = `https://gateway.pinata.cloud/ipfs/${item.substring(6)}`
        return (
          <a key={index} href={pinataGatewayURL} target='_blank'>
            <img key={index} src={pinataGatewayURL} alt='img' className='image-list'/>
          </a>
        )
      })
      setData(images);
  }
    } catch (error) {
      alert(error)
    }
    
}
  return (
    <>
      <div className='image-list'>{data}</div>
      <input type='text' placeholder='Enter Address' className='address'/>
      <button className='center button' onClick={getdata}>Get Data</button>
    </>
  )
}

export default Display