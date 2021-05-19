import React,{PureComponent,useState,useMemo,memo,useCallback,useRef, useEffect} from 'react'
import './todoList_noRedux.css'

function Controll() {
    return <div></div>
}

function Todos(){
    return <div></div>
}

function TodoList(){
    const [todos, setTodos] = useState(); 

    return(
        <div>
            <Controll/>
            <Todos/>
        </div>
    );
}

export default TodoList;