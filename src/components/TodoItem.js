import React from 'react'
import {FaTrashAlt, FaCheck} from "react-icons/fa"
import { Link } from 'react-router-dom'

function TodoItem({object, deleteItem, toggleStatus}) {

  return (
    <div className='todoItem'> 
        <Link to={"/users/"+ object.userId} 
            className={"todoTitle "+ (object.completed ? 'completeTitle' : 'notCompleteTitle')}>
                <p>{object.title}</p>         
        </Link>
        
        <div className='todoButton'>
            <button className='deleteBtn' onClick={() => {deleteItem()}}>
                    <FaTrashAlt color="red">

                    </FaTrashAlt>
            </button>
            <button className={"completeBtn "+ (object.completed ? 'completeTodo' : 'notCompleteTodo')}  onClick={()=>{toggleStatus()}} >
                    <FaCheck>

                    </FaCheck>
            </button>

        </div>
       
           
    </div>
  )
}

export default TodoItem