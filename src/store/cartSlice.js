import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    items: {},
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, {payload: {item}}) => {
            if (state.items[item.id]) {
                state.items[item.id] = [state.items[item.id][0] + 1, item];
            } else {
                state.items[item.id] = [1, item];
            }
        },
        removeItem: (state, {payload: {id}}) => {
            delete state.items[id];
        },
        modifyItem: (state, {payload: {item, amount}}) => {
            state.items[item.id] = [amount, item];
        },
    },
});

export const {
    addItem,
    removeItem,
    modifyItem,
} = cartSlice.actions;

export default cartSlice.reducer;
