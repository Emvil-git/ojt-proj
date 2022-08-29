import { useState } from "react";
import { useAppDispatch } from "../../reduxHooks";
import { addHire, dbAddHire, dbGetHires, hireFORCEIdle, selectHires } from "../../store/slices/HireSlice";
import React, { useRef, useEffect } from "react";
import { useBEM } from "../../hooks";
import { useSelector } from "react-redux";
import { changeModalShow } from "../../store/slices/AppSlice";
import { iHire } from "../../models/hire.interface";

const ModalHire = () => {

    const [B,E] = useBEM('modal-form');
    const dispatch = useAppDispatch();
    const [mhName, setMHName] = useState('');
    const [mhRole, setMHRole] = useState('');
    const [mhDept, setMHDept] = useState('');
    const [mhReports, setMHReports] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');


    const handleAddHire = (e: React.FormEvent) => {
        var date = new Date();
        
        e.preventDefault();
        let allFieldsFilled = [mhName, mhRole, mhDept, mhReports].every(Boolean) && addRequestStatus === 'idle';
        if(allFieldsFilled) {

            const newHire = {
                        hireName: mhName,
                        hireRole: mhRole,
                        hireDepartment: mhDept,
                        hireReportsTo: mhReports,
                        hireStartDate: date.toString().substr(4,11),
                    }

                        try {
                            setAddRequestStatus('pending')
                            dispatch(dbAddHire(newHire)).unwrap();
                            
                        } catch (err) {
                            console.error('Failed to save the post', err)
                        } finally {
                            
                            setAddRequestStatus('idle')
                        }
                        
            
            dispatch(changeModalShow(false));
            
        }

        dispatch(dbGetHires());
    }

    const closeModal = () => {
        dispatch(changeModalShow(false))
    }

    return(
        <div className={B()}>
            
            <form className={E('form-cont')} onSubmit={handleAddHire}>
                <span className={E('form-heading')}>New Hire</span>

                <div className={E('form-group')}>
                    <label htmlFor="mhire-name" className={E('form-label')}>Name</label>
                    <input
                    className={E('text-input')}
                    type="text"
                    name="mhire-name"
                    value={mhName}
                    onChange={(e) => setMHName(e.target.value)}/>
                </div>

                <div className={E('form-group')}>
                    <label htmlFor="mhire-role" className={E('form-label')}>Role</label>
                    <input
                    className={E('text-input')}
                    type="text"
                    name="mhire-role"
                    value={mhRole}
                    onChange={(e) => setMHRole(e.target.value)}/>
                </div>

                <div className={E('form-group')}>
                    <label htmlFor="mhire-dept" className={E('form-label')}>Department</label>
                    <input
                    className={E('text-input')}
                    type="text"
                    name="mhire-dept"
                    value={mhDept}
                    onChange={(e) => setMHDept(e.target.value)}/>
                </div>

                <div className={E('form-group')}>
                    <label htmlFor="mhire-name" className={E('form-label')}>Reports To</label>
                    <input
                    className={E('text-input')}
                    type="text"
                    name="mhire-reports"
                    value={mhReports}
                    onChange={(e) => setMHReports(e.target.value)}/>
                </div>

                <input
                className={E('btn')}
                type="submit" />

                <button onClick={closeModal} className={E('close-btn')}>cancel</button>
            </form>
        </div>
    )
}

export default ModalHire;