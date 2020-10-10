/* eslint no-param-reassign: 0 */

import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modals',
  initialState: {
    isOpen: false,
    type: null,
    extra: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpen = true;
      state.type = payload.type;
      state.extra = payload.data;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.extra = null;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
