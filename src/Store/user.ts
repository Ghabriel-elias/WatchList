import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserProps {
  user: {
    name: string;
    email: string;
    token: string;
    id: string;
  } | null;
  isGuest: boolean;
}

const initialState: UserProps = {
  user: null,
  isGuest: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProps['user']>) => {
      state.user = action.payload
    },
    setIsGuest: (state, action: PayloadAction<UserProps['isGuest']>) => {
      state.isGuest = action.payload
    }
  },
})

export const { setUser, setIsGuest } = userSlice.actions

export default userSlice.reducer