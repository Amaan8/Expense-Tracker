import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: {},
  totalAmount: 0,
  premium: false,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
      Object.values(action.payload).map(
        (expense) => (state.totalAmount += +expense.amount)
      );
      if (state.totalAmount > 10000) {
        state.premium = true;
      }
    },
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
