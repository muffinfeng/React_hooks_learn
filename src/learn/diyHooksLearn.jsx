import React,{PureComponent,useState,useMemo,memo,useCallback,useRef, useEffect} from 'react'

//自定义hook可以返回jsx元素
function useCounter (count){
    const size = useSize();
    return (
        <h1>{count}, {size.width}x{size.height}</h1>
    )
}

//把count相关操作抽出一个自定义hook中
function useCount(defaultCount){
    const[count, setCount] = useState(defaultCount);
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
    });

    return [count, setCount];
}

function useSize(){
    const [size , setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    });

    const onResize = () => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    }

    useEffect(() => {
        window.addEventListener('resize',onResize, false);

        return () => {
            window.removeEventListener('resize',onResize, false);
        }
    },[]);

    return size;
}
  
function useRefLearn(){
    const [count, setCount] = useCount(0);
    const Counter = useCounter(count);
    const size = useSize();
    return (
        <div>
        <button type="button" onClick={() => {
            setCount(count + 1);
        }}>
            Click {count} , {size.width}x{size.height}
        </button>
        {Counter}
       </div>
    );
}
  
export default useRefLearn;