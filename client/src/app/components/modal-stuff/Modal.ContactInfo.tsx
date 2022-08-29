import { useState } from "react";
import { useAppDispatch } from "../../reduxHooks";
import { addContact, addHire, dbAddHireContact, dbGetHires } from "../../store/slices/HireSlice";
import React, { useRef, useEffect } from "react";
import { useBEM } from "../../hooks";
import { useSelector } from "react-redux";
import { changeModalShow, selectModalHireId } from "../../store/slices/AppSlice";

const ModalContactInfo = () => {

    const [B,E] = useBEM('modal-form');
    const dispatch = useAppDispatch();
    const [mcEmail, setMCEmail] = useState('');
    const [mcNumber, setMCNumber] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const forHireId = useSelector(selectModalHireId);

    const handleSubmit = (e: React.FormEvent) => {
        
        e.preventDefault();
        let allFieldsFilled = [mcEmail, mcNumber].every(Boolean) && addRequestStatus === 'idle';
        if (allFieldsFilled) {

            const newContact = {
                email: mcEmail,
                phone: mcNumber,
            }   

            try {
                setAddRequestStatus('pending')
                dispatch(dbAddHireContact({hireId: forHireId, contactInfo: JSON.stringify(newContact)})).unwrap();
                
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                
                setAddRequestStatus('idle')
            }

            dispatch(changeModalShow(false))
        }

        let dbTimeout;
        dbTimeout = setTimeout(() => {dispatch(dbGetHires())}, 50);

    }

    const closeModal = () => {
        dispatch(changeModalShow(false))
    }

    return(
        <div className={B()}>
            
            <form onSubmit={handleSubmit} className={E('form-cont')}>
                <span className={E('form-heading')}>Add Contact Info</span>

                <div className={E('form-group')}>
                    <label htmlFor="mhire-name" className={E('form-label')}>Email</label>
                    <input
                    className={E('text-input')}
                    type="text"
                    name="mcontact-email"
                    value={mcEmail}
                    onChange={(e) => setMCEmail(e.target.value)}
                    />
                </div>

                <div className={E('form-group')}>
                    <label htmlFor="mhire-role" className={E('form-label')}>Contact Number</label>
                    <input
                    className={E('text-input')}
                    type="text"
                    name="mcontact-phone"
                    value={mcNumber}
                    onChange={(e) => setMCNumber(e.target.value)}
                    />
                </div>

                <input
                className={E('btn')}
                type="submit" />
                <button onClick={closeModal} className={E('close-btn')}>cancel</button>
            </form>
        </div>
    )
}

export default ModalContactInfo;