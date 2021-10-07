import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface daysOfTheWeek {
  selectedDays: string[];
}

export const initialState: daysOfTheWeek = {
  selectedDays: [],
};
export type daysOfTheWeekType =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';
export const daysOfTheWeekReducer = createSlice({
  name: 'daysOfTheWeek',
  initialState,
  reducers: {
    addDayOfTheWeek: (state, action: PayloadAction<daysOfTheWeekType>) => {
      if (state.selectedDays.includes(action.payload)) {
        state.selectedDays.splice(
          state.selectedDays.indexOf(action.payload),
          1,
        );
      } else {
        state.selectedDays.push(action.payload);
      }
    },

    reset: (state: daysOfTheWeek) => {
      state.selectedDays = [];
    },
  },
});
export const {addDayOfTheWeek, reset} = daysOfTheWeekReducer.actions;
export default daysOfTheWeekReducer.reducer;
