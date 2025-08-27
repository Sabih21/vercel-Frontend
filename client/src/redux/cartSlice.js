import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    id: null,
    user_id: null,
    session_id: null,
    color: null,
    size: null,
    status: null,
    created_at: null,
    items: [],
  },
  reducers: {
    setCart: (state, action) => {
      const {
        id,
        user_id,
        session_id,
        color,
        size,
        status,
        created_at,
        items,
      } = action.payload;
      state.id = id || null;
      state.user_id = user_id || null;
      state.session_id = session_id || null;
      state.color = color || null;
      state.size = size || null;
      state.status = status || null;
      state.created_at = created_at || null;
      state.items = items || [];
    },
    clearCart: (state) => {
      state.id = null;
      state.user_id = null;
      state.session_id = null;
      state.color = null;
      state.size = null;
      state.status = null;
      state.created_at = null;
      state.items = [];
    },

    // ✅ new reducer for removing a single item
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
});

export const { setCart, clearCart,removeItem  } = cartSlice.actions;
export default cartSlice.reducer;
