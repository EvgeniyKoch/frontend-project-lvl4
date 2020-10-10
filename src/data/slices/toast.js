/* eslint no-param-reassign: 0 */

import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modals',
  initialState: { isOpen: false },
  reducers: {
    showToast: (state, { payload }) => {
      state.isOpen = payload;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
