import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import iApp from "../../models/app.interface";
import { ModalType, ViewType } from "../../models/types";
import { RootState } from "../../store";

const initialState: iApp = {
    view: ViewType.DASHBOARD,
    isModalShow: false,
    modalType: ModalType.MHIRE,
    modalForHireId: 0,
    modalForAssetId: 0,
    isLoadingShow: false,
}

const appSlice = createSlice({
    name: 'AppSlice',
    initialState,
    reducers: {
        changeView(state, action: PayloadAction<ViewType>) {
            state.view = action.payload;
        },

        changeModalShow(state, action: PayloadAction<boolean>){
            state.isModalShow = action.payload;
        },

        changeModalViewType(state, action: PayloadAction<ModalType>) {
            state.modalType = action.payload;
        },

        changeModalHireId(state, action: PayloadAction<number>) {
            state.modalForHireId = action.payload;
        },

        changeModalAssetId(state, action: PayloadAction<number>) {
            state.modalForAssetId = action.payload;
        },

        changeLoadingShow(state, action: PayloadAction<boolean>){
            state.isLoadingShow = action.payload;
        },
    }
})



export const { changeView, changeModalShow, changeModalViewType, changeModalHireId, changeModalAssetId, changeLoadingShow } = appSlice.actions;

export const selectModalShow = (state:RootState) => state.appReds.isModalShow;
export const selectModalType = (state:RootState) => state.appReds.modalType;
export const selectModalHireId = (state:RootState) => state.appReds.modalForHireId;
export const selectModalAssetId = (state:RootState) => state.appReds.modalForAssetId;
export const selectLoadingShow = (state:RootState) => state.appReds.isLoadingShow;

export default appSlice;