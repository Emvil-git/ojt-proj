import { selectEvents } from "../store/slices/EventSlice";
import { selectHires } from "../store/slices/HireSlice";
import { useBEM } from "../hooks";
import { iHire } from "../models/hire.interface";
import { useSelector } from "react-redux";
import { FileEarmarkCheckFill, FileEarmarkFill, FileEarmarkXFill, PersonCheckFill, PersonFill, PersonXFill, Laptop, LaptopFill } from 'react-bootstrap-icons';
import { useState } from "react";
import { selectRefs, selectDocs } from "../store/slices/BackgroundSlice";

interface Props {
    hire: iHire;
}

const DashHireCard:React.FC<Props> = (props) => {

    const [B,E] = useBEM('dash-hire');
    const allRefs = useSelector(selectRefs);
    const allDocs = useSelector(selectDocs);
    const hireRefs = allRefs.filter(ref => props.hire.hireRefs?.includes(ref.refId));
    const hireDocs = allDocs.filter(doc => props.hire.hireDocs?.includes(doc.docId));
    console.log('hireRefs (Dashboard Hire Card):')
    console.log(hireRefs);
    console.log('-----------------')
    
    const refVerify = () => {
        if (hireRefs.length === 0) return <PersonXFill className={E('indicator-red')}/>
        return hireRefs.every(ref => ref.refIsContacted === true) ? <PersonCheckFill className={E('indicator-blue')}/> : <PersonFill className={E('indicator-grey')}/>
    }

    const docsVerify = () => {
        if (hireDocs.length === 0) return <FileEarmarkXFill className={E('indicator-red')}/>
        return hireDocs.every(doc => doc.docIsVerified === true) ? <FileEarmarkCheckFill className={E('indicator-blue')}/> : <FileEarmarkFill className={E('indicator-grey')}/>
    }

    const assetIndicator = () => {
        if (props.hire.hireAsset !== null ){
            if (props.hire.hireAsset.length === 0) return <LaptopFill className={E('indicator-grey')}/>
            return <Laptop className={E('indicator-blue')}/>
        }
    }

    return(
        <div className={B()}>
            <section className={E('hire-card-info')}>
                <div className={E('mock-img')}></div>
                <section>
                    <span className={E('title')}>{props.hire.hireName}</span>
                    <section>
                        <span className={E('text-role')}>{props.hire.hireRole}</span>
                        <span className={E('text-dept')}>{props.hire.hireDepartment}</span>
                    </section>
                </section>
            </section>
            <section className={E('hire-indicators')}>
                {refVerify()}
                {docsVerify()}
                {assetIndicator()}
            </section>
        </div>
    )
}

export default DashHireCard;