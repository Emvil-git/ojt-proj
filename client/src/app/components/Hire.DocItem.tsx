import React, { useEffect, useState } from "react";
import { useBEM } from "../hooks";
import { BGType } from "../models/types";
import { iDocument, iReference } from "../models/background.interface";
import { CheckLg ,TrashFill, QuestionCircleFill, FileEarmarkCheckFill, PersonCheckFill } from 'react-bootstrap-icons';
import { useAppDispatch } from "../reduxHooks";
import { setDocVerified, delDoc, dbVerifyDoc, dbDelDoc } from "../store/slices/BackgroundSlice";

interface Props {
    bgDoc: iDocument
}

const DocumentItem:React.FC<Props> = (props) => {

    const [B,E] = useBEM('reference-item');
    const dispatch = useAppDispatch();
    const [isVerified, setIsVerified] = useState(false);
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const indicatorVerify = () => {
        if (props.bgDoc.docIsVerified) {
            return <FileEarmarkCheckFill/>
        }

        return <QuestionCircleFill/>
    }

    const verifyHandler = () => {

        const cDocVerify = {
            docId: props.bgDoc.docId
        }

        try {
            dispatch(dbVerifyDoc(cDocVerify)).unwrap();
            dispatch(setDocVerified({docId: props.bgDoc.docId, isVerified: true}))

        } catch (err) {
            console.error('Failed to verify the doc', err)
        } finally {
            
            setAddRequestStatus('idle')
        }
    }

    const deleteHandler = () => {

        const cDocDelete = {
            docId: props.bgDoc.docId,
        }

        try {
            dispatch(dbDelDoc(cDocDelete)).unwrap();
            dispatch(delDoc({id: props.bgDoc.docId}));

        } catch (err) {
            console.error('Failed to delete the doc', err)
        } finally {
            
            setAddRequestStatus('idle')
        }

    }

    const sizeToString = (docSize: number) => {
        let sizeVal;
        switch (true) {
            case docSize > Math.pow(2,30) :
                sizeVal = (docSize/Math.pow(2,30)).toFixed(2);
                return sizeVal.toString() + ' GB';

            case docSize > Math.pow(2,20) :
                sizeVal = (docSize/Math.pow(2,20)).toFixed(2);
                return sizeVal.toString() + ' MB';

            case docSize > Math.pow(2,10) :
                sizeVal = (docSize/Math.pow(2,10)).toFixed(2);
                return sizeVal.toString() + ' KB';
            
            default :
                return (docSize).toString() + ' B';
        }
    }

    return(
        <div className={B()}>
            <section className={E('content')}>
                <section className={E('indicator')}>
                    {indicatorVerify()}
                </section>
                <section className={E('details')}>
                    <span className={E('details--title')}>{props.bgDoc?.docTitle}</span>
                    <span className={E('details--size')}>{sizeToString(props.bgDoc?.docSize)}</span>
                </section>
            </section>
            
            <section className={E('actions')}>
                <button className={E('btn')} onClick={() => verifyHandler()} >
                    <CheckLg/>
                </button>
                <button className={E('btn')} onClick={() => deleteHandler()}>
                    <TrashFill/>
                </button>
            </section>
        </div>
    )
}

export default DocumentItem;