const reducers = {
    todos(state, action){
        const {type, payload} = action;

        switch(type){
            case 'set':
                return payload;
            case 'add':
                return [...state, payload];
            case 'remove':
                return state.filter(todo => {
                        return todo.id !== payload
                    })
            case 'toggle':
                return state.map(todo => {
                        if(todo.id === payload){
                            return {
                                ...todo,
                                complete : !todo.complete,
                            }
                        }else{
                            return todo
                        }
                    })
                
        }

        return state;
    },
    increment(state, action){
        const {type} = action;
        switch(type){
            case 'set':
            case 'add':
                return state + 1;
        }

    }
}


function combineReducers(reducers){
    return function reducer(state, action) {
        const changed = {};
        for(let key in reducers){
            changed[key] = reducers[key](state[key], action);
        }
        console.log(changed)
        return {
            ...changed,
        };
    };
}


const reducer = combineReducers(reducers);

export default reducer;