import React,{PureComponent,useState,useMemo,memo,useCallback,useRef, useEffect} from 'react'


const Counter = memo(function Counter(props){

    console.log('Counter render');
    return (
        <h1 onClick={props.onClick}>{props.count}</h1>
    )
});
  
function useRefLearn(){
    const[count, setCount] = useState(0);
    const[clickCount,setClickCount] = useState(0);

    //根据依赖是否变化，来决定函数是否重新执行，优化性能。
    const double = useMemo(() => {
        return count * 2;
    },[count === 3])

    //useCallback防止onClick方法传入子组件后，即使本身没有变化，也会引起子组件的重新渲染
    const onClick = useCallback(() => {
            console.log('Click');
            //setClickCount(clickCount + 1);
    },[]);

    //useMemo(() => fn)
    //useCallback(fn)

    return (
        <div>
        <button type="button" onClick={() => {
            setCount(count + 1);
        }}>
            Click {count}   double: {double}
        </button>
        <Counter count={double} onClick={onClick}></Counter>
        </div>
    );
}
  
export default useRefLearn;