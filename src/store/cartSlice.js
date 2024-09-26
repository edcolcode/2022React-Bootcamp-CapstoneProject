import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    items: {},
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, {payload: {id}}) => {
            state.items[id] = 1;
        },
        removeItem: (state, {payload: {id}}) => {
            state.items.delete(id);
        },
        modifyItem: (state, {payload: {id, amount}}) => {
            state.items[id] = amount;
        },
    },
});

export const {
    addItem,
    removeItem,
    modifyItem,
} = cartSlice.actions;

export default cartSlice.reducer;
