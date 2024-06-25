import { createSlice } from "@reduxjs/toolkit";
export const UserSlice = createSlice({
    name: 'user',
    initialState:{name:'',id:'',isEmployee:false},
    reducers: {
      update(state, action){

        state.name=action.payload.name;
        state.id=action.payload.id;
        state.isEmployee=action.payload.isEmployee

      },

    },
  })
  export default UserSlice.reducer;
  export const{update}=UserSlice.actions;