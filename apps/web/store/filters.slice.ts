import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
interface filterOption {
  grains: string[];
  limit: number;
  nutrients: string[];
}

const initialState: filterOption = {
  grains: [],
  limit: 100,
  nutrients: [],
};

const filterSlice = createSlice({
  name: "filterOption",
  initialState,
  reducers: {
    addFilter(state, { payload }) {
      switch (payload?.type) {
        case "grains":
          state.grains?.push(payload.data);
          break;
        case "healthBenefits":
          state.healthBenefits?.push(payload.data);
          break;
        default:
          break;
      }
    },
    removeFilter(state, { payload }) {
      switch (payload.type) {
        case "grains":
          let index = state?.grains?.indexOf(payload.data);
          if (index != -1) {
            state.grains = state.grains.filter(
              (grain) => grain !== payload.data
            );
          }
          break;
        case "healthBenefits":
          let healthIndex = state?.healthBenefits?.indexOf(payload.data);
          if (healthIndex != -1) {
            state.healthBenefits = state.healthBenefits.filter(
              (temp) => temp !== payload.data
            );
          }
          break;
        default:
          break;
      }
    },
  },
});

export const filterAction = filterSlice.actions;

export default filterSlice.reducer;
