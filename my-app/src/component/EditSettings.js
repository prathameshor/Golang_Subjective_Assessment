import React ,{ useState,useEffect, useRef } from 'react'

const EditSettings = () => {
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

  return (
    <div>
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
  )
}

export default EditSettings
