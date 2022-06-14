import { useState,useEffect } from 'react';
import './App.css';
import Line from './components/Line';
import OI from './components/OI';
import {UserData} from './Data'

function App() {
  const [userData,setUserData] = useState({
    labels:UserData.map((datad) => datad.time),
    datasets:[{
      label:"OI",
      data:UserData.map((datad) => datad.oi)
    }]
  })
  const [putOI, setPutOI] = useState({
    labels:UserData.map((datad) => datad.time),
    datasets:[{
      label:"OI",
      data:UserData.map((datad) => datad.oi)
    }]
  })

  
  const [inp, setInp] = useState('30')
  const [temp, setTemp] = useState('')
  useEffect(() => {
    fetch('http://localhost:4000/api/range/'+inp+'-'+inp+'').then(res => res.json().then((chartData) => {
      setUserData({
        labels:chartData.Oi.map((datad) => datad.time),
        datasets:[{
          label:chartData.Oi[0].strike,
          data:chartData.Oi.map((datad) => datad.oi[0].CE)
        }]
      })
      setPutOI({
        labels:chartData.Oi.map((datad) => datad.time),
        datasets:[{
          label:chartData.Oi[0].strike,
          data:chartData.Oi.map((datad) => datad.oi[1].PE)
        }]
      })
    }))

  },[inp])

  const handleClick = () =>{
    setInp(temp)
  }

  
  return (
    <div className="App">
      <div style={{width:500, display:'flex'}}>
      
      <OI chartdata={userData}/>
      <OI chartdata={putOI} />
      </div>
      <input id={'hi'} value={temp} onChange={e => setTemp(e.target.value)} />
      <button onClick={handleClick}>Change</button>
      <select>
        
      </select>
    </div>
  );
}

export default App;
