import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  extra: null,
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action) {
      const { payload: { type, extra = null } } = action;
      return {
        ...state,
        isOpened: true,
        type,
        extra,
      };
    },
    closeModal(state) {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const { openModal, closeModal } = modal.actions;
export default modal.reducer;
