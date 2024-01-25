import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./createSlice";

const appStore  = configureStore({
    reducer : {
        weatherarr : userSlice
    }
})

export default appStore;