import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: { token: null as string|null, user: null as any, loading:false, error:null as string|null },
  reducers: {
    loginRequest(state, _){ state.loading=true; state.error=null; },
    loginSuccess(state, action: PayloadAction<{ token:string; user:any }>) { state.loading=false; state.token=action.payload.token; state.user=action.payload.user; },
    loginFailure(state, action: PayloadAction<string>) { state.loading=false; state.error=action.payload; },
    logout(state){ state.token=null; state.user=null; }
  }
});

export const { loginRequest, loginSuccess, loginFailure, logout } = slice.actions;
export default slice.reducer;
