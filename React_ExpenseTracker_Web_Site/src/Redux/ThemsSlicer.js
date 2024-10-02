import { createSlice } from "@reduxjs/toolkit";

const initialState ={
        toggletheme : false
}

const themSlicer = createSlice({
    name :'toggle',
    initialState,
    reducers : {
        toggle(state){
           state.toggletheme = !state.toggletheme
        }
    }
})

export const toggleAction  = themSlicer.actions;
export default themSlicer.reducer;
