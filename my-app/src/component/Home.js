import React, { useState } from 'react'
import EditSettings from './EditSettings';
import '../styles/home.css'
const Home = ({ toggleSettings }) => {

 const[isSettingsClicked,setIsSettingClicked] = useState(false);
 const[isAcquireDataClicked,setIsAcquireData] = useState(true);
 const[shouldSettingBeDisabled,setshouldSettingBeDisabled] = useState(false)
 const[dataArr,setDataArr]=useState([])
 let shouldIntervalbeDisabled = false

 let interval;

 const handleSettingClick=(e)=>{
    setIsSettingClicked(!isSettingsClicked)
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


  return (
    <>
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

        </div>  
    
          <div>
             {
                isSettingsClicked && <EditSettings></EditSettings>
             }
          </div>
    </>
  )
}

export default Home
