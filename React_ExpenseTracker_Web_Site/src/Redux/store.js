import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./authSlicer";
import themSlicer from "./ThemsSlicer";

const store = configureStore({
  reducer:{
    theme:themSlicer,
    auth:authSlicer
  },
});

export default store;