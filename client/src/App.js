import './App.css';
import Upload from '../src/artifacts/contracts/Upload.sol/Upload.json'
import {useState,useEffect} from 'react'
import {ethers} from 'ethers'
import FileUpload from './components/FileUpload'
import Modal from './components/Modal'
import Display from './components/Display'

function App() {
  const [account,setAccount] = useState('');
  const [contract,setContract] = useState(null);
  const [provider,setProvider] = useState(null);
  const [modalOpen,setModalOpen] = useState(false);

  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    window.ethereum.on("accountsChanged", (accounts) => {
      window.location.reload();
    });
    
    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });
    const loadProvider = async()=>{
      if(provider){
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          // console.log(signer);
          const address = await signer.getAddress();
          setAccount(address);
          const contract = new ethers.Contract("0x02E6Fc868Bb9d1a576F9D2CeA17f830302266D32",Upload.abi,signer);
          setContract(contract);
          setProvider(provider);
      }else{
        console.log("Please install metamask")
      }
    }

    provider && loadProvider();
  },[])
  return (
    <>
    {!modalOpen && <button className='share' onClick={()=>setModalOpen(true)}>Share</button>}
    {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract}/>}
    <div className="App">
     <h1 style={{color:'white'}}>Gdrive 3.0</h1>
     <div className='bg'></div>
     <div className='bg bg2'></div>
     <div className='bg bg3'></div>

     <p style={{color:'white'}}>Account : {account?account:"Not connected..."}</p>
     <FileUpload contract={contract} account={account} provider={provider} setModalOpen={setModalOpen}/>
     <Display contract={contract} account={account}/>
    </div>
    </>
  );
}

export default App;


//npx hardhat run --network localhost scripts/deploy.js
