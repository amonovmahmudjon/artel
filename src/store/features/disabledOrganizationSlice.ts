import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// 1. Boshlang'ich holat (State): Sahifaga kirganda qulf doim ochiq (false) bo'ladi
interface DisableOrgState {
  isDisabled: boolean;
}

const initialState: DisableOrgState = {
  isDisabled: false,
};

// 2. Slice yaratish
const disableOrganizationSlice = createSlice({
  name: 'disableOrganization', // Redux DevTools'da ko'rinadigan nom
  initialState,
  reducers: {
    // 3. MANA SIZ IZLAYOTGAN FUNKSIYA:
    // U o'zi bilan bitta "true" yoki "false" qiymat (payload) olib keladi
    setDisableOrganization: (state, action: PayloadAction<boolean>) => {
      // Kelgan qiymatni xotiraga yozib qo'yamiz
      state.isDisabled = action.payload; 
    },
  },
});

// Komponentlarda (masalan, sizning kodingizda) dispatch qilish uchun eksport qilamiz
export const { setDisableOrganization } = disableOrganizationSlice.actions;

// Store'ning bosh miyasiga ulash uchun default eksport qilamiz
export default disableOrganizationSlice.reducer;