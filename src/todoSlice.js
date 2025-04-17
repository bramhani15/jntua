import {createSlice} from '@reduxjs/toolkit';
const todoSlice = createSlice({
    name: 'todo',
    initialState:{
        todoList: []
    },
    reducers:{
        craetetodo: (state,action) =>{
            state.push({id: Date.now(),text: action.payload, completed: false});
        },
        readTodo: (state) => state,
        updateTodo: (state, action) => {
            const todo = state.find(todo =>todo.id === action.payload);
            if(todo){
                todo.completed = !todo.completed;
            }
        },
        deleteTodo: (state, action) => {
            return state.fliter(todo => todo.id !== action.payload);
        }
    }

});
export const {addtodo} = todoSlice.actions;
export default todoSlice.reducer;