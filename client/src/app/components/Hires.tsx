import { useBEM } from "../hooks";
import { useEffect, useState } from "react";
import AccordionItem from "./Hire.AccordionItem";
import { useSelector } from "react-redux";
import { selectHires, selectHiresError, selectHiresStatus, dbGetHires, hireFORCEIdle } from "../store/slices/HireSlice";
import { changeModalHireId, changeModalShow, changeModalViewType, changeLoadingShow, selectModalShow } from "../store/slices/AppSlice";
import { BGIdsType, BGType, ModalType } from "../models/types";
import { useAppDispatch } from "../reduxHooks";

const Hires = () => {

    const [B,E] = useBEM('hires');
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');

    let hiresData = useSelector(selectHires);
    const hiresStatus = useSelector(selectHiresStatus);
    const hiresError = useSelector(selectHiresError);

    const hiresShouldRender = useSelector(selectModalShow);

    const modalAddHire = () => {
        dispatch(changeModalViewType(ModalType.MHIRE));
        dispatch(changeModalShow(true));
    } 

    useEffect(() => {
        if (hiresStatus === 'idle') {
            dispatch(dbGetHires());
            
            // Check out the spinkit 
            
            let skTimeout;
            skTimeout = setTimeout(() => {dispatch(changeLoadingShow(false))}, 750);
        }
    }, [hiresStatus, dispatch])


    let content;

    const dynamicSearch = () => {
        return  hiresData
        .filter(hire => hire.hireName.toLowerCase().includes(search.toLowerCase()))
        .map(
            hire => {
                return Array.isArray(hire) ? <AccordionItem key={hire.hireName} hire={hire[0]}/> : <AccordionItem key={hire.hireName} hire={hire}/>
            }
        )
    }

    if(hiresStatus === 'loading') {
        dispatch(changeLoadingShow(true));
        content = <div></div>
    }else if(hiresStatus === 'succeeded') {
        
        dispatch(changeLoadingShow(false));

        content = dynamicSearch();
        let skTimeout
        skTimeout = setTimeout(() => {dispatch(changeLoadingShow(false))}, 750);
    }else if (hiresStatus === 'failed') {
        content = <p>Data fetch failed</p>;
        let skTimeout
        skTimeout = setTimeout(() => {dispatch(changeLoadingShow(false))}, 750);
    }


    return(
        <div className={B()}>
            <div className={E('header')}>
                <h4 className={E('header', 'title')}>Hires</h4>

                <section className={E('actions')}>
                    <input
                        className={E('searchbox')}
                        value ={search}
                        onChange = {(ev) => setSearch(ev.target.value)}
                        type="text"
                        placeholder="Search "  
                    />

                    <button onClick={modalAddHire} className={E('addbtn')}>
                        ADD HIRE
                    </button>
                </section>
            </div>
            <div className={E('list')}>
                <section className={E('list' ,'heading')}>
                    <span>Name</span>
                    <span>Role</span>
                    <span>Department</span>
                    <span>Reports to</span>
                    <span>Date Started</span>
                </section>

                <section className={E('list' ,'entries')}>
                    {content}
                </section>
            </div>
        </div>
    )
}

export default Hires;