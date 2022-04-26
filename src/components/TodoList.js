import axios from 'axios'
import {useEffect, useState} from "react"
import TodoItem from './TodoItem'

function TodoList() {
    const [selected, setSelected] = useState("all");
    const [todoData, setTodoData] = useState([])
    const [wordEntered, setWordEntered] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const getData= function(){
        axios.get("https://jsonplaceholder.typicode.com/todos/").then((response)=>{
            if(response.status >= 200 && response.status <300){
                const result = response.data.map(obj => ({userId :obj.userId, id:obj.id, title:obj.title, completed: obj.completed }))
                setTodoData(result)
            }else{
                console.log("Data not loaded")
            }
        })
    }

    useEffect(()=>{ 
              getData()      
    },[])

    const handleSelect = (event) => {
            setSelected(event.target.value);
    };
    
    const handleDelete= (id)=>{
            setTodoData(todoData.filter(item=>item.id!=id))
            setFilteredData(filteredData.filter(item=>item.id!=id))
            if(todoData.length==1){
                alert("Reloading data")
                getData()
            }            
    }  
    const handleToggle= (id) =>{
        setTodoData(todoData.map((item)=> item.id==id ? {...item, completed: !item.completed} : item))
        setFilteredData(filteredData.map((item)=> item.id==id ? {...item, completed: !item.completed} : item))
    }
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = todoData.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });
        
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    
    };
    const filterData= function(){
            if(wordEntered!="" && filteredData != [] ){
                    if(selected=="false"){
                        return filteredData.map(item=>{
                            return (!item.completed) &&
                            <TodoItem object = {item} key={item.id} deleteItem={()=>handleDelete(item.id)} toggleStatus={()=>handleToggle(item.id)}></TodoItem> })
                    }else if(selected== "true"){
                            return filteredData.map(item=>{
                                return (item.completed) &&
                                <TodoItem object = {item} key={item.id} deleteItem={()=>handleDelete(item.id)} toggleStatus={()=>handleToggle(item.id)}></TodoItem> })
                    }else{
                            return filteredData.map(item=>
                                <TodoItem object = {item} key={item.id} deleteItem={()=>handleDelete(item.id)} toggleStatus={()=>handleToggle(item.id)}></TodoItem>)
                    }             
            }else{
                if(selected=="false"){
                    return todoData.map(item=>{
                        return (!item.completed) &&
                        <TodoItem object = {item} key={item.id} deleteItem={()=>handleDelete(item.id)} toggleStatus={()=>handleToggle(item.id)}></TodoItem> })
                }else if(selected== "true"){
                        return todoData.map(item=>{
                            return (item.completed) &&
                            <TodoItem object = {item} key={item.id} deleteItem={()=>handleDelete(item.id)} toggleStatus={()=>handleToggle(item.id)}></TodoItem> })
                }else{
                        return  todoData.map(item=>
                            <TodoItem object = {item} key={item.id} deleteItem={()=>handleDelete(item.id)} toggleStatus={()=>handleToggle(item.id)}></TodoItem>)
                }  
            }
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

            <div className='searchBar'> 
                <input
                    type="text"
                    placeholder="Search todo"
                    value={wordEntered}
                    onChange={handleFilter} />
            </div>
        </div>
        {         
           filterData()
        }
    </div>
    </>
  )
}


export default TodoList