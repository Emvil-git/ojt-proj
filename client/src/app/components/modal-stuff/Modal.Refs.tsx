import { useBEM } from "../../hooks";
import { useState } from "react";
import { useAppDispatch } from "../../reduxHooks";
import { BGType } from "../../models/types"
import { addHireRef, dbAddHireRef, hireFORCEIdle } from "../../store/slices/HireSlice";
import { addRef, dbAddRef, dbGetRefs, selectRefs } from "../../store/slices/BackgroundSlice";
import { useSelector } from "react-redux";
import { changeModalShow, selectModalHireId } from "../../store/slices/AppSlice";
import { changeSelectedHireModal } from "../../store/slices/HireSlice";
import { idToStrArray } from "../../api-methods/dataMethods";

const ModalRefs = () => {

    const [B,E] = useBEM('modal-form');
    const dispatch = useAppDispatch();

    const [mrName, setMRName] = useState('');
    const [mrInstitute, setMRInstitute] = useState('');
    const [mrContactNo, setMRContactNo] = useState('');
    const [mrTypeStr, setMRTypeStr] = useState(['Educational Background','Previous Experience','Seminars Attended']);
    const [mrType, setMRType] = useState<BGType>();
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const Add = mrTypeStr.map(Add => Add)

    

    const stringToType = (value:string) => {
        switch(value) {
            case "0":
                setMRType(BGType.EDUCATION);
                break;
            case "1":
                setMRType(BGType.EXPERIENCE);
                break;
            case "2":
                setMRType(BGType.SEMINARS);
                break;
        }
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

    const forHireId = useSelector(selectModalHireId);
    const allRefs = useSelector(selectRefs);

    console.log('ALL REFS IN STORE ------------')
    console.log(allRefs);

    const allHireRefs = allRefs
        .filter(ref => ref.refHireId === forHireId)
        .map(ref => {return ref.refId}); 
        
        console.log('allhireRefs: ')
        console.log(allHireRefs)
        console.log(idToStrArray(allHireRefs));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(changeSelectedHireModal(forHireId));

        let maxId = 0;
        if (allRefs.length !== 0) {
            const allRefIds = allRefs.map(ref => {return ref.refId});
            maxId = Math.max(...allRefIds);   
        }

        let allFieldsFilled = [mrName, mrInstitute, mrContactNo].every(Boolean) && addRequestStatus === 'idle';
        if(mrType !== undefined && allFieldsFilled) {

            const newHRIds = allHireRefs.length === 0 ? idToStrArray([maxId+1]) : idToStrArray(allHireRefs.concat(maxId + 1));

            console.log('strArry: ');
            console.log(newHRIds);
            
            const newRef = {
                refHireId: forHireId,
                refName: mrName,
                refNumber: mrContactNo,
                refInst: mrInstitute,
                refType: typeToString(mrType),
                refIsContacted: 0,
            }

            const newHireRef = {
                hireRefs: newHRIds,
                hireId: forHireId
            }

            console.log('newHireREf is:');
            console.log(newHireRef);

            try {
                setAddRequestStatus('pending')
                dispatch(dbAddRef(newRef)).unwrap();
                dispatch(dbAddHireRef(newHireRef)).unwrap();
                
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                
                setAddRequestStatus('idle')
            }

            
            
            dispatch(changeModalShow(false))
        }
        console.log('REFERENCE ADDED')
        dispatch(dbGetRefs());

        dispatch(hireFORCEIdle());
        
    }

    const closeModal = () => {
        dispatch(changeModalShow(false))
    }

    return(
        <div className={B()}>
            
            <form onSubmit={handleSubmit} className={E('form-cont')}>
                <span className={E('form-heading')}>New Reference Contact</span>

                <div className={E('form-group')}>
                    <label htmlFor="mref-inst" className={E('form-label')}>Company/School</label>
                    <input
                    className={E('text-input')}
                    type="text"
                    name="mref-inst"
                    value={mrInstitute}
                    onChange={(e) => setMRInstitute(e.target.value)}/>
                </div>

                <div className={E('form-group')}>
                    <label htmlFor="mref-name" className={E('form-label')}>Name</label>
                    <input
                    className={E('text-input')}
                    type="text"
                    name="mref-name"
                    value={mrName}
                    onChange={(e) => setMRName(e.target.value)}/>
                </div>

                <div className={E('form-group')}>
                    <label htmlFor="mref-contact" className={E('form-label')}>Contact Number</label>
                    <input
                    className={E('text-input')}
                    type="text"
                    name="mref-contact"
                    value={mrContactNo}
                    onChange={(e) => setMRContactNo(e.target.value)}/>
                </div>

                <div className={E('form-group')}>
                    <label htmlFor="mref-type" className={E('form-label')}>Reference Category</label>
                    <select onChange={ev => stringToType(ev.target.value)} className={E('form-dropdown')} name="" id="">
                        <option className={E('form-dropdown--option')} disabled selected value="">Select a Category</option>
                        {
                        Add.map((type, key) => <option value={key}>{type}</option>)
                        }
                    </select>
                </div>

                <input
                className={E('btn')}
                type="submit" />

                <button onClick={closeModal} className={E('close-btn')}>cancel</button>
            </form>
        </div>
    )
}

export default ModalRefs;