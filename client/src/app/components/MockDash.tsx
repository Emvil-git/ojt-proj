import { useBEM } from "../hooks";
import { changeModalHireId, changeModalShow, changeModalViewType, changeView } from "../store/slices/AppSlice";
import { useAppDispatch } from "../reduxHooks";
import { ModalType, ViewType } from "../models/types";
import { addEvent, selectEvents } from "../store/slices/EventSlice";
import { useSelector } from "react-redux";
import DashEventCard from "./MockDash.Events";
import DashHireCard from "./MockDash.HireCard";
import { FileEarmarkFill, Laptop } from 'react-bootstrap-icons';
import { selectHires } from "../store/slices/HireSlice";
import { selectDocs } from "../store/slices/BackgroundSlice";
import { selectAssets } from "../store/slices/AssetSlice";

const MockDash = () => {

    const [B,E] = useBEM('mockdash');
    const dispatch = useAppDispatch();


    const modalAddEvent = () => {
        dispatch(changeModalViewType(ModalType.MEVENT));
        dispatch(changeModalShow(true));
    }

    const handleToHires = () => {
        dispatch(changeView(ViewType.HIRES))
    }

    const allEvents = useSelector(selectEvents);
    const allHires = useSelector(selectHires);
    const allDocs = useSelector(selectDocs);
    const allAssets = useSelector(selectAssets);

    const aAssets = allAssets.filter(asset => asset.assetHireId !== null);

    const verifiedDocs = allDocs.filter(doc => doc.docIsVerified);

    return(
        <div className={B()}>
            <div className={E('grid')}>
                <div className={E('events')}>
                    <section className={E('sect-header')}>
                        <h2 className={E('header-text')}>EVENTS</h2>
                        <button className={E('btn-primary')} onClick={modalAddEvent}>ADD EVENT</button>
                    </section>
                    
                    <section className={E('card-cont')}>
                        {allEvents.map(event => <DashEventCard event={event}/>)}
                    </section>
                    
                </div>

                <div className={E('hires')}>
                    <section className={E('sect-header')}>
                        <h2 className={E('header-secondary')}>Hires</h2>
                        <span className={E('details-link')} onClick={() => handleToHires()}>See Details</span>
                    </section>
                    <section className={E('hire-cont')}>
                        {allHires.map(hire => <DashHireCard hire={hire}/>)}
                    </section>
                </div>

                <div className={E('docs')}>
                    <FileEarmarkFill className={E('sect-icon')}/>
                    <section className={E('sect-info')}>
                        <section>
                            {/* <span className={E('sect-value')}>{verifiedDocs.length}</span> */}
                            <span className={E('sect-text')}>{verifiedDocs.length} of {allDocs.length}</span>
                            {/* <span className={E('sect-value')}>{allDocs.length}</span> */}
                        </section>
                        <span className={E('sect-text')}>documents verified</span>
                    </section>
                </div>

                <div className={E('assets')}>
                    <Laptop className={E('sect-icon')}/>
                    <section className={E('sect-info')}>
                        <section>
                            {/* <span className={E('sect-value')}>{aAssets.length}</span> */}
                            <span className={E('sect-text')}>{aAssets.length} of {allAssets.length}</span>
                            {/* <span className={E('sect-value')}>{allAssets.length}</span> */}
                        </section>
                        <span className={E('sect-text')}>assets assigned</span>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default MockDash