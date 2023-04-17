import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "./homeSlice";

const store = configureStore({
    reducer: {
        home: HomeSlice
    }
})

export default store;