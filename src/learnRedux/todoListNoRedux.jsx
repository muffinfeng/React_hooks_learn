import React,{PureComponent,useState,useMemo,memo,useCallback,useRef, useEffect} from 'react'
import './todoListNoRedux.css'
import {createAdd,
        createSet,
        createRemove,
        createToggle} from './action';
import reducer from './reducers';



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
        addTodo(value);

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

let store = {
    todos: [],
    increment: 0,
}

function TodoList(){
    const [todos, setTodos] = useState([]); 
    const [increment, setInCrement] = useState(0);

     
    useEffect(() => {
        Object.assign(store,{
            todos,
            increment
        })
    },[todos, increment])

    const dispatch = (action) => {

        if('function' === typeof action){
            action(dispatch, () => store);
            return;
        }
        const newState = reducer(store,action);

        const setters = {
            todos: setTodos,
            increment: setInCrement
        };

        for(let key in newState){
            setters[key](newState[key]);
        }
    };

    useEffect(() => {
        const value = localStorage.getItem(KEY, todos) || '';
        dispatch(createSet(JSON.parse(value)))
    },[]);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    },[todos]);

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