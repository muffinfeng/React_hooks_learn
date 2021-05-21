import React,{PureComponent,useState,useMemo,memo,useCallback,useRef, useEffect} from 'react'
import './todoList_noRedux.css'
import {createAdd,
        createSet,
        createRemove,
        createToggle} from './action'

let newId = Date.now();

function bindActionCreators(actionCreators, dispatch){
    const ret = {};

    for(let key in actionCreators) {
        ret[key] = function(...args){
            const actionCreater = actionCreators[key];
            const action = actionCreater(...args);
            dispatch(action);
        }
    }

    return ret;
}

const Controll = memo(function Controll(props) {
    const { addTodo } = props;
    const inputRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();

        const value = inputRef.current.value.trim();

        if(value.length === 0 ){return;}
        console.log('hi')
        addTodo({
            id : ++newId,
            complete : false,
            text : value
        });

        inputRef.current.value = '';
    }

    return (
        <div className="control">
            <h1>todo</h1>

            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    className="new-todo"
                    placeholder="add todo"
                    ref={inputRef}
                    />
            </form>
        </div>

    )
});

const TodoItem = memo(function TodoItem(props){
    const {
        removeTodo,
        toggleTodo,
        todo:{
            id,
            complete,
            text
        }} = props;

   

        
    const onClick = () => {
        // dispatch(createRemove(id));
        removeTodo(id);
    };

    const onChange = () => {
        // dispatch(createToggle(id));
        toggleTodo(id);
    };

    return (
        <li className="todo-item">
            <input
                type="checkbox"
                onChange={onChange}
                checked={complete}
            />
            <label className={complete ? 'complete' : ''}>{text}</label>
            <button onClick={onClick}>删除</button>
        </li>
    )
})

const Todos = memo(function Todos(props){
    const {toggleTodo, removeTodo, todos} = props;


    return (
        <ul>
            {
                todos.map(todo => {
                    return (<TodoItem 
                        todo={todo}
                        key={todo.id}
                        toggleTodo={toggleTodo}
                        removeTodo={removeTodo}
                    />)
                })
            }
        </ul>

    )
})

let KEY= '_$key_';

function TodoList(){
    const [todos, setTodos] = useState([]); 

    const dispatch = useCallback((action) => {
        const {type, payload} = action;
        switch(type){
            case 'set':
                setTodos(payload);
                break;
            case 'add':
                setTodos(todos => [...todos,payload]); 
                break;
            case 'remove':
                setTodos(todos => todos.filter(todo => {
                    return todo.id !== payload
                }))
                break;
            case 'toggle':
                console.log('toggle')
                setTodos(todos => todos.map(todo => {
                    if(todo.id === payload){
                        return {
                            ...todo,
                            complete : !todo.complete,
                        }
                    }else{
                        return todo
                    }
                }));
                break;
            default:
        }

    })

    // const addTodo = useCallback((todo) => {
    //     setTodos(todos => [...todos,todo]); 
    // })

    // const removeTodo = useCallback((id) => {
    //     setTodos(todos => todos.filter(todo => {
    //         return todo.id !== id
    //     }))
    // })

    // const toggleTodo = useCallback((id) => {
    //     setTodos(todos => todos.map(todo => {
    //         if(todo.id === id){
    //             return {
    //                 ...todo,
    //                 complete : !todo.complete,
    //             }
    //         }else{
    //             return todo
    //         }
    //     }));
    // })


    useEffect(() => {
        const value = localStorage.getItem(KEY, todos) || '';
        dispatch(createSet(JSON.parse(value)))
    },[]);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    },[todos]);

    return(
        <div>
            <Controll 
            {
                ...bindActionCreators({
                    addTodo: createAdd
                }, dispatch)
            }
            />
            <Todos 
            {
                ...bindActionCreators({
                    toggleTodo: createToggle,
                    removeTodo: createRemove
                }, dispatch)
            }
            todos={todos}/>
        </div>
    );
}

export default TodoList;