export function createSet(payload){
    return {
        type:'set',
        payload
    }
}

let newId = Date.now();

export function createAdd(text){
    return (dispatch, getStore) => {

        setTimeout(() => {
            const { todos } = getStore();
            if(!todos.find(todo => todo.text === text)){
                dispatch({
                    type: 'add',
                    payload: {
                        id: ++newId,
                        text,
                        complete: false,
                    }
                })
            }
        }, 3000)
        
    }
}

export function createRemove(payload){
    return {
        type:'remove',
        payload
    }
}

export function createToggle(payload){
    return {
        type:'toggle',
        payload
    }
}