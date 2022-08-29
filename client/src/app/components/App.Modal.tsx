import { useBEM } from "../hooks"
import { ModalType } from "../models/types"
import ModalHire from "./modal-stuff/Modal.Hire"
import ModalAsset from "./modal-stuff/Modal.Asset";
import ModalRefs from "./modal-stuff/Modal.Refs";
import ModalDocs from "./modal-stuff/Modal.Docs";
import ModalContactInfo from "./modal-stuff/Modal.ContactInfo";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../reduxHooks";
import { selectModalType, changeModalShow } from "../store/slices/AppSlice";
import ModalProgram from "./modal-stuff/Modal.Program";
import ModalEvents from "./modal-stuff/Modal.Event";

interface Props {
    type: ModalType;
}


const AppModal = () => {
    const [B,E] = useBEM('app-modal')
    const dispatch = useAppDispatch();

    const modal = useSelector(selectModalType);

    const modalType = () => {
        switch(modal){
            case ModalType.MASSET:
                return <ModalAsset/>;
            case ModalType.MHIRE:
                return <ModalHire/>;
            case ModalType.MREF:
                return <ModalRefs/>;
            case ModalType.MDOC:
                return <ModalDocs/>;
            case ModalType.MCONTACT:
                return <ModalContactInfo/>;
            case ModalType.MPROGRAM:
                return <ModalProgram/>;
            case ModalType.MEVENT:
                return <ModalEvents/>
        }
    }

    return(
        <div className={B()}>
            {modalType()}
        </div>
    )
}

export default AppModal;