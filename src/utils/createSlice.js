import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"weather",
    initialState : {
        weatherinfo : null
    },
    reducers : {
        addWeatherinfo : (state,action) => {
            state.weatherinfo = action.payload
        }
    }
})

export const{addWeatherinfo} = userSlice.actions;
export default userSlice.reducer;
