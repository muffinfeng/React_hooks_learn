import './App.css';
import React,{PureComponent,useState,useMemo,memo,useCallback,useRef, useEffect} from 'react'
import UseRefLearn from './learn/useRefLearn';
import DiyHooksLearn from './learn/diyHooksLearn';
import UseMemoUseCallback from './learn/useMemoUseCallback'
import TodoListNoRedux from './learn/todoList_noRedux';

function App(){
  

  return (
    <TodoListNoRedux></TodoListNoRedux>
  );
}

export default App;
