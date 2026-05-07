// store/features/organizationSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface OrganizationState {
  selectedOrgId: number | null;
}

const initialState: OrganizationState = {
  // Sahifa yangilansa ham tanlov o'chib ketmasligi uchun localStorage'dan olamiz
  selectedOrgId: Number(localStorage.getItem("selectedOrgId")) || null,
};

export const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    setSelectedOrgId: (state, action: PayloadAction<number>) => {
      state.selectedOrgId = action.payload;
      // Har safar o'zgarganda localStorage'ga ham yozib qo'yamiz
      localStorage.setItem("selectedOrgId", action.payload.toString());
    },
  },
});

export const { setSelectedOrgId } = organizationSlice.actions;
export default organizationSlice.reducer;