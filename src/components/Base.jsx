import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Base = ({name, num, setNum}) => { 
  const [person, setPerson] = useState([]);
  const [controller, setController] = useState(0);

    let me = 'rely'
    me = me.substring(0,2);
  const data = [
    { id: 1,
      name: 'frank',
      properties: [
        {age: 25, correct: false},
        {age: 50, correct: false},
        {age: 33, correct: true},
      ]
    },
    {id: 2,
      name: 'rely',
      properties: [
        {age: 5, correct: false},
        {age: 60, correct: true},
        {age: 93, correct: false},
      ]
    },
    {id: 3,
      name: 'kara',
      properties: [
        {age: 125, correct: true},
        {age: 250, correct: false},
        {age: 333, correct: false},
      ]
    },
  ]

  const handleclick = (props) => {
    console.log(props)
    if(props.correct){
      setController((prev) => prev + 1)
    }

  }

  useEffect(() => {
    setPerson(data[controller])
  }, [controller])

  return (
    <div>
        <div>{name}</div>
        <div>{num}</div>
        <div onClick={()=>{setNum((prev) => prev + 1)}}>click me</div>
        <div>{me}</div>

        <input type="color" name="" id="" />

        <div>{person?.name}</div>
        <p>
          {person?.properties?.map((props) => (
            <div>
              <div onClick={()=>handleclick(props)}>{props.age}</div>
              
            </div>
          ))}
        </p>
        <Link to={'/'}>Home</Link>
    </div>

  )
}

export default Base