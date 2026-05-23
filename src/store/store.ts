import { configureStore } from "@reduxjs/toolkit"
import  authReducer  from "@/store/features/authSlice";
import organizationReducer from "@/store/features/organizationSlice"
import  disableOrganizationReducer  from "./features/disabledOrganizationSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        organization: organizationReducer,
        disableOrganization: disableOrganizationReducer

    }
})

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            organization: organizationReducer,
            disableOrganization: disableOrganizationReducer
            
            

        }
    })
}


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];