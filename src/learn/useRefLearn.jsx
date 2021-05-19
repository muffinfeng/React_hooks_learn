import React,{PureComponent,useState,useMemo,memo,useCallback,useRef, useEffect} from 'react'


//useRef的作用1是获取子组件的属性，方法，2是当作类的静态变量，比如防止it变量在重新渲染后被重置
class Counter extends PureComponent{
    speak(){
      console.log('now count is ',this.props.count);
    };
  
    render(){
      const {props} = this;
      return(
        <h1 onClick={props.onClick}>{props.count}</h1>
      );
    }
    
}
  
function useRefLearn(){
    const[count, setCount] = useState(0);
    const countRef = useRef();
    //let it;
    const it = useRef;

    useEffect(() => {
        it.current = setInterval(() => {
            setCount(count => count + 1)
        },1000);
    },[]);

    useEffect(() => {
        if(count >= 10){
        clearInterval(it.current);
        }
    })

    const double = useMemo(() => {
        return count * 2;
    },[count === 3])

    const onClick = useCallback(() => {
        console.log('onClick');
        countRef.current.speak();
    },[countRef])

    return (
        <div>
        <button type="button" onClick={() => {
            setCount(count + 1);
            countRef.current.speak();
        }}>
            Click {count}   double: {double}
        </button>
        <Counter ref={countRef} count={double} onClick={onClick}></Counter>
        </div>
    );
}
  
export default useRefLearn;