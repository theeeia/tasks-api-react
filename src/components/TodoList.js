import axios from 'axios'
import {useEffect, useState} from "react"
import TodoItem from './TodoItem'

function TodoList() {
    const [selected, setSelected] = useState("all");
    const [todoData, setTodoData] = useState([])
   
    const getData= function(){
        axios.get("https://jsonplaceholder.typicode.com/todos/?_limit=10").then((response)=>{
            if(response.status >= 200 && response.status <300){
                const result = response.data.map(obj => ({userId :obj.userId, id:obj.id, title:obj.title, completed: obj.completed }))
                setTodoData(result)
            }else{
             
            }
        })
    }

    useEffect(()=>{ //odma na mount da se izvrshit
              getData()      
    },[])

    const handleSelect = (event) => {
            setSelected(event.target.value);
    };
    
    const handleDelete= (id)=>{
            setTodoData(todoData.filter(item=>item.id!=id))
            console.log(todoData.length)
            if(todoData.length==1){
                console.log("noen")
                alert("Reloading data")
                getData()
            }
    }  
    const handleToggle= (id) =>{
        setTodoData(todoData.map((item)=> item.id==id ? {...item, completed: !item.completed} : item))
    }

  return (
<>
    <div className='container'>       
        <div className='dropdown'>
            <select 
                value={selected}
                defaultValue={"all"}
                onChange={e=> handleSelect(e)}
            >
                <option value={"all"}>All</option>
                <option value={true}>Completed</option>
                <option value={false}>Not Completed</option>
            </select>
        </div>
        {
        (selected == "false") ? 
                todoData.map(item=>{
            return (!item.completed) &&
            <TodoItem object = {item} key={item.id} deleteItem={()=>handleDelete(item.id)} toggleStatus={()=>handleToggle(item.id)}></TodoItem> }):
            ((selected== "true")?  todoData.map(item=>{
                return (item.completed) &&<TodoItem object = {item} key={item.id} deleteItem={()=>handleDelete(item.id)} toggleStatus={()=>handleToggle(item.id)}></TodoItem> }): (   
                  todoData.map(item=><TodoItem object = {item} key={item.id} deleteItem={()=>handleDelete(item.id)} toggleStatus={()=>handleToggle(item.id)}></TodoItem>)
                ))      
        } 
    </div>
    </>
  )
}

export default TodoList