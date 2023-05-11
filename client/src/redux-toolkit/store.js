import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "./userDetailsReducer";

//combine reducers
const store = configureStore({
  reducer: {
    user: userDetailsReducer,
  },
});

export default store;


/*The configureStore() method is used to create a Redux store, 
which holds the entire state tree of the application.*/