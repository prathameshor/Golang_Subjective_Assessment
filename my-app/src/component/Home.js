import React, { useState } from 'react'
import EditSettings from './EditSettings';
import '../styles/home.css'
const Home = ({ toggleSettings }) => {


  let myMap = new Map();

  const[defaultValue,setDefaultValue] = useState(96);
  const[defaultValueofWavelength,setdefaultValueofWavelength] = useState(1);
  const[inputValue,setInputValue]=useState(0);
  let [arr,setArr] = useState([]);
  let [lmValues,setlmValues] = useState([]);
  
  const handleValueChange = (e) => {
      setDefaultValue(e.target.value); 
      console.log(e.target.value)
  }

  const handleValueChangeOfWavelength = (e) =>{
    setdefaultValueofWavelength(e.target.value)
    setArr([])
      console.log(defaultValueofWavelength)
      for(let i=0;i<e.target.value;i++){
        setArr(prevValue=>[...prevValue,i]);
      }
  }

  const handleOnChange = (e,element) => { 
      setInputValue(e.target.value);
  }

  const addValueToList=(e,element)=>{
     console.log(inputValue)
     console.log(element)
     if(myMap.has(element)){
       
     }
     else {
      myMap.set(element,inputValue)
     }
     setlmValues(initialValues =>[...initialValues,inputValue]);   
  }
  
  // --------------------------------------------------------------------------------

 const[isSettingsClicked,setIsSettingClicked] = useState(true);
 const[isAcquireDataClicked,setIsAcquireData] = useState(true);
 const[shouldSettingBeDisabled,setshouldSettingBeDisabled] = useState(false)
 const[dataArr,setDataArr]=useState([])
 let shouldIntervalbeDisabled = false

 let interval;

 const handleSettingClick=(e)=>{
    setIsSettingClicked(false)
 }
    
 const handleCancelEditSettings = (e) =>{
  setIsSettingClicked(true)
 }

  const acquireData = (e)=>{
     setshouldSettingBeDisabled(true);
     setIsAcquireData(false);
     // when acquire data is clicked a function is called to acquire data on api
     // we will add the data to array list after every one sec and let the array traverse as it is 
     // how to add delay of 1 sec?????
   
    interval = setInterval(() => {
        setDataArr(prevData =>[...prevData,"some more data"])
        console.log(shouldIntervalbeDisabled + "value of interval") 
        if(shouldIntervalbeDisabled===true) {
          clearInterval(interval);
        }      
    }, 1000);
       
      setTimeout(()=>{
        shouldIntervalbeDisabled = true;
      },5000)
    
   
  }
  const stopAcquireData = (e) =>{
    shouldIntervalbeDisabled = true;
    setshouldSettingBeDisabled(false);
    setIsAcquireData(true);
    console.log(shouldIntervalbeDisabled + "inside acquire") 
    
  }

  const handlePostData = (e) => {
    
  }

  return (
    <>
    {
     isSettingsClicked ?
    
        <div className='startUp-menue'>
          <div className='buttons'>
             <button type='button'  disabled={shouldSettingBeDisabled} className='button btn btn-primary' onClick={({toggleSettings})=>handleSettingClick({toggleSettings})} >Settings...</button>
             
            { isAcquireDataClicked ? <button type='button' className='button btn btn-primary' onClick={(e)=>acquireData(e)}>Acquire Data</button> 
                :
                <button type='button' className='button btn btn-primary' onClick={(e)=>stopAcquireData(e)}>Stop Acquire Data</button> 
            }
          </div>

          <div className='table table-data'>
            <table>
                <thead>
                
                     <th>
                        Well Index
                     </th> 
                    
                    <th>
                      Wavelength Values
                    </th>
                    
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Some Value</td>
                    </tr>

                    {
                        dataArr.map(element=>{
                            return (
                                <tr>
                                    <td>2</td>
                                    <td>{element}</td> 
                                </tr>
                                )
                        })
                    }
                    
                    
                </tbody>
            </table>
          </div>

          <div className='buttons'>
             <button type='button' className='button  btn btn-secondary'>OK</button>
             <button type='button' className='button btn btn-secondary'>Cancel</button>
          </div>

        </div> :
         <div className='settings-menue'>
           <div className="setting-css ">
           <div>
          Number of Wells : <select
            defaultValue={defaultValue}
            onChange={(e)=>handleValueChange(e)}
          >
            <option value="24">24</option>
            <option value="48">48</option>
            <option value="96">96</option>
            <option value="384">384</option>
          </select>
       </div>

       <div>
          Number of WaveLengths : <select
            defaultValue={defaultValueofWavelength}
            onChange={(e)=>handleValueChangeOfWavelength(e)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
       </div>
         
       {
        arr.map((element)=>{
          return(
            <div>
             LM{element+1}:<input  type="number" onChange={(e,element)=>handleOnChange(e,element)} placeholder="Enter LM Value"></input>
             <button className='btn btn-primary' onClick={(e)=>addValueToList(e,element)}>Add Wavelength To List</button>
            </div>
          )      
        })
       }
       <div>{defaultValue}</div>
       <div>{defaultValueofWavelength}</div>
       <div>{lmValues}</div>
         </div>
         <div>
           <button onClick={(e)=>handlePostData(e)} className='button  btn btn-secondary'>Post Data</button>
           <button onClick={(e)=>handleCancelEditSettings(e)} className='button  btn btn-secondary'>Cancel Settings</button>
           </div>          
         </div> 
    
      }
    </>
  )
}

export default Home
