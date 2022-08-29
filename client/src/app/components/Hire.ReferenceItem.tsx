import React, { useEffect, useState } from "react";
import { useBEM } from "../hooks";
import { BGType } from "../models/types";
import { iDocument, iReference } from "../models/background.interface";
import { CheckLg ,TrashFill, QuestionCircleFill, FileEarmarkCheckFill, PersonCheckFill } from 'react-bootstrap-icons';
import { useAppDispatch } from "../reduxHooks";
import { setRefVerified, delRef, dbVerifyRef, dbDelRef } from "../store/slices/BackgroundSlice";

interface Props {
    bgRef: iReference
}

const ReferenceItem:React.FC<Props> = (props) => {

    const [B,E] = useBEM('reference-item');
    const dispatch = useAppDispatch();
    const [isVerified, setIsVerified] = useState(false);
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const indicatorVerify = () => {
        if (props.bgRef.refIsContacted) {
            return <PersonCheckFill/>
        }

        return <QuestionCircleFill/>
    }

    const verifyHandler = () => {

        const cRefVerify = {
            refId: props.bgRef.refId,
        }

        try {
            dispatch(dbVerifyRef(cRefVerify)).unwrap();
            dispatch(setRefVerified({refId: props.bgRef.refId, isVerified: true}))

        } catch (err) {
            console.error('Failed to verify the ref', err)
        } finally {
            
            setAddRequestStatus('idle')
        }
    }

    const deleteHandler = () => {

        const cRefDelete = {
            refId: props.bgRef.refId,
        }

        try {
            dispatch(dbDelRef(cRefDelete)).unwrap();
            dispatch(delRef({id: props.bgRef.refId}));

        } catch (err) {
            console.error('Failed to delete the ref', err)
        } finally {
            
            setAddRequestStatus('idle')
        }

    }

    console.log('hireId: ' + props.bgRef?.refHireId)
    console.log('refName: ' + props.bgRef.refName)
    console.log('refId: ' + props.bgRef?.refId)

    return(
        <div className={B()}>
            <section className={E('content')}>
                <section className={E('indicator')}>
                    {indicatorVerify()}
                </section>
                <section className={E('details')}>
                    <span className={E('details--institute')}>{props.bgRef?.refInst}</span>
                    <span className={E('details--name')}>{props.bgRef?.refName}</span>
                    <span className={E('details--number')}>{props.bgRef?.refNumber}</span>
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

export default ReferenceItem;