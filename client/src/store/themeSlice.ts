import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


// mode setting interface for the app
interface ThemeState {
    mode: "light" | "dark"
}

const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

const initialState: ThemeState = {
  mode: savedTheme ?? "light",
};


const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state: ThemeState) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            localStorage.setItem("theme", state.mode);
        },

        setTheme: (state: ThemeState, action: PayloadAction<"light" | "dark">) => {
            state.mode = action.payload;
        },
    },
})


export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;