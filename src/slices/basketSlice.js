import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // global veriable Itmes
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    
      hydrate: (state, action) => {
      return action.payload;
    },
   
    //Store actions
    addToBasket: (state, action) => {
      // spread existing items and add action.payload(product pass trough ass payload)
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {

      // if we didn't find index , it be -1, in other cases it be positive number                             
      //check out if item equel product
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id);
      // make coppy current basket
      let newBasket = [...state.items];

      if (index > -1) {
        //The item exists in the basket... remove it...
        //splice basically cutout( means remove one item)
        // console.log(newBasket)
        newBasket.splice(index, 1)

      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id})as its not in the basket`
        );
      }
      state.items = newBasket;
    },
    removeGroupedFromBasket: (state, action) => {
      let newBasket = state.items.filter(
        (item) => item.id !== action.payload.id
      );

      state.items = newBasket;
    },
    clearBasket: (state, action) => {
      state.items = [];
    },
   
  },
});

export const { 
  addToBasket, 
  removeFromBasket, 
  removeGroupedFromBasket,
  hydrate,
  clearBasket 
} = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
//itterating through (add price from total)
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
