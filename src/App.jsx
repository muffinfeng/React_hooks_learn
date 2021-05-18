import './App.css';
import React,{Component,useState,useMemo,memo} from 'react'

const Counter = memo(function Counter(props){
  console.log("count init")
  return (
    <div onClick={props.onClick}>{props.count}</div>
  )
})

function App(){
  const[count, setCount] = useState(0);

  const double = useMemo(() => {
    return count * 2;
  },[count === 3])

  const onClick = () => {
    console.log('onClick');
  }

  return (
    <div>
      <button type="button" onClick={() => {setCount(count + 1)}}>
          Click {count}   double: {double}
      </button>
      <Counter count={double} onClick={onClick}></Counter>
    </div>
  );
}

export default App;
