import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    basket: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;
        },
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.basket.find(
                (item) =>
                    item.id === newItem.id &&
                    item.clothe === newItem.clothe &&
                    item.classIndex === newItem.classIndex
            );
            if (existingItem) {
                existingItem.quantity += newItem.quantity || 1;
            } else {
                state.basket.push({ ...newItem, quantity: newItem.quantity || 1, selected: false });
            }
        },

        changeQuantity: (state, action) => {
            const { id, amount, clothe, classIndex } = action.payload;
            const item = state.basket.find(
                (item) =>
                    item.id === id &&
                    item.clothe === clothe &&
                    item.classIndex === classIndex
            );
            if (item) {
                if (item.quantity === 1 && amount === -1) {
                    state.basket = state.basket.filter(
                        (item) =>
                            item.id !== id ||
                            item.clothe !== clothe ||
                            item.classIndex !== classIndex  // 
                    );
                } else {
                    item.quantity = Math.max(1, item.quantity + amount);
                }
            }
        },

        toggleSelectItem: (state, action) => {
            const { id, clothe, classIndex } = action.payload;
            const item = state.basket.find(
                (item) =>
                    item.id === id &&
                    item.clothe === clothe &&
                    item.classIndex === classIndex
            );
            if (item) {
                item.selected = !item.selected;
            }
        },

        removeItem: (state, action) => {
            const { id, clothe, classIndex } = action.payload;
            state.basket = state.basket.filter(
                (item) =>
                    item.id !== id ||
                    item.clothe !== clothe ||
                    item.classIndex !== classIndex
            );
        },

        selectAll: (state, action) => {
            const checked = action.payload;
            state.basket = state.basket.map((item) => ({
                ...item,
                selected: checked,
            }));
        },
        removeSelected: (state) => {
            state.basket = state.basket.filter((item) => !item.selected);
        },
        clearCart: (state) => {
            state.basket = [];
        },
    },
});

export const {
    setBasket,
    addItem,
    changeQuantity,
    toggleSelectItem,
    selectAll,
    removeSelected,
    removeItem,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
