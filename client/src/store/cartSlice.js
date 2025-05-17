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
                    item.id === newItem.id && item.clothe === newItem.clothe
            );
            if (existingItem) {
                existingItem.quantity += newItem.quantity || 1;
            } else {
                state.basket.push({ ...newItem, quantity: newItem.quantity || 1, selected: false });
            }
        },
        changeQuantity: (state, action) => {
            const { id, amount, clothe } = action.payload;
            const item = state.basket.find(
                (item) => item.id === id && item.clothe === clothe
            );
            if (item) {
                if (item.quantity === 1 && amount === -1) {
                    // Если количество товара 1 и нажата кнопка "-" — удаляем товар
                    state.basket = state.basket.filter(
                        (item) => item.id !== id || item.clothe !== clothe
                    );
                } else {
                    item.quantity = Math.max(1, item.quantity + amount);
                }
            }
        },
        toggleSelectItem: (state, action) => {
            const { id, clothe } = action.payload;
            const item = state.basket.find(
                (item) => item.id === id && item.clothe === clothe
            );
            if (item) {
                item.selected = !item.selected;
            }
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
        removeItem: (state, action) => {
            const { id, clothe } = action.payload;
            state.basket = state.basket.filter(
                (item) => item.id !== id || item.clothe !== clothe
            );
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
