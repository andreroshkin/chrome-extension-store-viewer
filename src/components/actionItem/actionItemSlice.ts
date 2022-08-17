import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ActionItemState {
    value: any;
}

const initialState: ActionItemState = {
    value: null,
};

export const actionItemSlice = createSlice({
    name: "stateByKey",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
    },
});

export const { set } = actionItemSlice.actions;

export default actionItemSlice.reducer;
