import { createContext, useState } from "react";

const TodoContext = createContext()

export const TodoProvider = ({children})=>{
    const [name, setName] = useState("hafafax")

    return <TodoContext.Provider value={{name}}> {children}
 
     </TodoContext.Provider>


}

export default TodoContext