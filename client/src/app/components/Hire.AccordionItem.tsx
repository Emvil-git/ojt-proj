import { useState } from "react";
import { useBEM } from "../hooks";
import HireEventCard from "./Hire.EventCard";
import BackgroundAccordion from "./Hire.BackgroundAccordion";
import ContactItem from "./Hire.ContactItem";
import { iHire } from "../models/hire.interface";
import { BGIdsType, BGType, ModalType } from "../models/types";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../reduxHooks";
import HireAssetItem from "./Hire.AssetItem";
import { changeModalHireId, changeModalShow, changeModalViewType } from "../store/slices/AppSlice";
import { PersonPlusFill, FileEarmarkPlusFill, Laptop } from 'react-bootstrap-icons';
import { changeSelectedHireModal } from "../store/slices/HireSlice";

interface Props {
    hire: iHire;
}

const AccordionItem:React.FC<Props> = (props) => {

    const [B,E] = useBEM('acc-item');
    const [isOpen, setIsOpen] = useState(false);
    const [openKey, setOpenKey] = useState<string | null>();
    const currentHireId = props.hire.hireId;
    const dispatch = useAppDispatch();

    console.log('hire refs ------------')
    console.log(props.hire.hireRefs);

    const currentHireBg:BGIdsType = {
        cHireRefIds: props.hire.hireRefs,
        cHireDocIds: props.hire.hireDocs
    }

    console.log('Current Hire BGs:')
    console.log(currentHireBg)

    const handleToggle = (key:string) => {
        setOpenKey(openKey !== key ? key : null)
    }

    const openClass = () => {
        if (isOpen === true) return E('basic','selected');
        return E('basic');
    }

    const typeToString = (type:BGType) => {
        switch (type) {
            case BGType.EDUCATION:
                return "Educational Attainment";
            case BGType.EXPERIENCE:
                return "Previous Work Experience";
            case BGType.SEMINARS:
                return "Seminars Attended";
        }
    }

    const modalAddRef = () => {
        dispatch(changeModalViewType(ModalType.MREF));
        dispatch(changeModalHireId(props.hire.hireId));
        dispatch(changeSelectedHireModal(props.hire.hireId));
        dispatch(changeModalShow(true));
    }

    const modalAddDoc = () => {
        dispatch(changeModalViewType(ModalType.MDOC));
        dispatch(changeModalHireId(props.hire.hireId));
        dispatch(changeSelectedHireModal(props.hire.hireId));
        dispatch(changeModalShow(true));
    }

    const modalAddAsset = () => {
        dispatch(changeModalViewType(ModalType.MASSET));
        dispatch(changeModalHireId(props.hire.hireId));
        dispatch(changeSelectedHireModal(props.hire.hireId));
        dispatch(changeModalShow(true));
    }

    const modalAddContactInfo = () => {
        dispatch(changeModalViewType(ModalType.MCONTACT));
        dispatch(changeModalHireId(props.hire.hireId));
        dispatch(changeSelectedHireModal(props.hire.hireId));
        dispatch(changeModalShow(true));
    }

    const contactAvailable = () => {
        return props.hire.hireContact ? <ContactItem info={props.hire.hireContact}/> : <button onClick={modalAddContactInfo} className={E('btn-secondary')}>Add contact</button> 
    }

    const eventsAvailable = () => {
        if (props.hire.hireEvents) props.hire.hireEvents.map(event => {return <HireEventCard eventId={event}/>})
    }

    return(
        <div className={B()}>
            <div onClick={() => setIsOpen(!isOpen)} className={openClass()}>
                <section className={E('data-cont')}>
                    <div className={E('hire-icon')}></div>
                    <span className={E('data')}>{props.hire.hireName}</span>
                </section>
                <span className={E('data')}>{props.hire.hireRole}</span>
                <span className={E('data')}>{props.hire.hireDepartment}</span>
                <section className={E('data-cont')}>
                    <div className={E('hire-icon')}></div>
                    <span className={E('data')}>{props.hire.hireReportsTo}</span>
                </section>
                <span className={E('data')}>{props.hire.hireStartDate}</span>

            </div>
            {isOpen && 
            <div className={E('additional')}>
                <div className={E('details')}>
                    <span className={E('details--title')}>CONTACT</span>
                    <section className={E('details--content')}>
                        {contactAvailable()}
                    </section>
                </div>
                <div className={E('details')}>
                    <section className={E('details--header')}>
                        <span className={E('details--title')}>BACKGROUND CHECKING</span>

                        <section>
                            <button className={E('details--add')} onClick={modalAddRef}>
                                <PersonPlusFill className={E('details--add-icon')}/>
                            </button>
                            <button className={E('details--add')} onClick={modalAddDoc}>
                                <FileEarmarkPlusFill className={E('details--add-icon')}/>
                            </button>
                        </section>
                    </section>
                    
                    <section className={E('details--content')}>
                        <BackgroundAccordion
                            type={BGType[0]}
                            name={typeToString(BGType.EDUCATION)}
                            toggle={handleToggle}
                            open={openKey === typeToString(BGType.EDUCATION)}
                            hireId={currentHireId}
                            hireBGIds={currentHireBg}/>
                       
                       <BackgroundAccordion
                            type={BGType[1]}
                            name={typeToString(BGType.EXPERIENCE)}
                            toggle={handleToggle}
                            open={openKey === typeToString(BGType.EXPERIENCE)}
                            hireId={currentHireId}
                            hireBGIds={currentHireBg}/>

                        <BackgroundAccordion
                            type={BGType[2]}
                            name={typeToString(BGType.SEMINARS)}
                            toggle={handleToggle}
                            open={openKey === typeToString(BGType.SEMINARS)}
                            hireId={currentHireId}
                            hireBGIds={currentHireBg}/>
                    </section>
                </div>
                <div className={E('details')}>
                    <section className={E('details--header')}>
                        <span className={E('details--title')}>ASSETS</span>
                        <button className={E('details--add')} onClick={modalAddAsset}><Laptop/>+</button>
                    </section>
                    
                    <section className={E('details--content')}>
                        {props.hire.hireAsset?.map(
                            assetId => <HireAssetItem hireAssetId={assetId}/>
                        )}
                    </section>
                </div>
                <div className={E('details')}>
                    <span className={E('details--title')}>EVENTS</span>
                    <section className={E('details--content')}>
                        {props.hire.hireEvents?.map(event => <HireEventCard eventId={event}/>)}
                        {/* <button>Add event</button> */}
                    </section>
                </div>
            </div>
            }
            
        </div>
    )
}

export default AccordionItem;