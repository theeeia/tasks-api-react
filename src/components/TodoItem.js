import React from 'react'
import {FaTrashAlt, FaCheck} from "react-icons/fa"
function TodoItem({object, deleteItem, toggleStatus}) {

  return (
    <div className='todoItem'> 
        <div className={"todoTitle "+ (object.completed ? 'completeTitle' : 'notCompleteTitle')}>
            <p>{object.title}</p>
        </div>
        <div className='todoButt'>
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