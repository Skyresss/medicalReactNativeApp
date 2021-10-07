import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface MedicationInfo {
  [key: string]: {
    pillName: string;
    schedule: {
      from: string;
      to: string;
      dayOfWeek: string[];
      time: string;
    };
    description?: string;
    checked: boolean;
  };
}
export interface AddMedicationInfo {
  pillName: string;
  schedule: {
    from: string;
    to: string;
    dayOfWeek: string[];
    time: string;
  };
  description?: string;
  checked: boolean;
  prevTime?: string;
}

const initialState: MedicationInfo = {
  'Analgin_12:12': {
    pillName: 'Analgin',
    schedule: {
      from: '2021-11-01',
      to: '2021-12-22',
      dayOfWeek: ['Tuesday', 'Thursday', 'Saturday'],
      time: '12:12',
    },
    checked: true,
  },
  'Asperin_17:21': {
    pillName: 'Asperin',
    schedule: {
      from: '2021-09-01',
      to: '2021-11-30',
      dayOfWeek: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
      time: '17:21',
    },
    checked: true,
  },
};

export const medicalInfoReducer = createSlice({
  name: 'medicalInfo',
  initialState,
  reducers: {
    changeCheckbox: (state, action: PayloadAction<string>) => {
      state[action.payload].checked = !state[action.payload].checked;
    },
    addOrEditMedication: (state, action: PayloadAction<AddMedicationInfo>) => {
      delete state[`${action.payload.pillName}_${action.payload.prevTime}`];
      state[`${action.payload.pillName}_${action.payload.schedule.time}`] = {
        pillName: action.payload.pillName,
        schedule: {
          from: action.payload.schedule.from,
          to: action.payload.schedule.to,
          dayOfWeek: action.payload.schedule.dayOfWeek,
          time: action.payload.schedule.time,
        },
        checked: action.payload.checked,
      };
    },
    deleteMedication: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});
export const selectListPills = (state: {medicalInfo: MedicationInfo}) =>
  Object.values(state.medicalInfo);
export const {changeCheckbox, addOrEditMedication, deleteMedication} =
  medicalInfoReducer.actions;

export default medicalInfoReducer.reducer;
