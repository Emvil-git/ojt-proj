import { ModalType, ViewType } from "./types"

export default interface iApp {
    view: ViewType;
    isModalShow: boolean;
    modalType: ModalType;
    modalForHireId: number;
    modalForAssetId: number;
    isLoadingShow: boolean;
}