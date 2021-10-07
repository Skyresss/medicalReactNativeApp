import {configureStore} from '@reduxjs/toolkit';
import medicalInfoReducer from './reducers/medicalInfoReducer';
import daysOfTheWeekReducer from './reducers/daysOfTheWeekReducer';
export const store = configureStore({
  reducer: {
    medicalInfo: medicalInfoReducer,
    daysOfTheWeek: daysOfTheWeekReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
