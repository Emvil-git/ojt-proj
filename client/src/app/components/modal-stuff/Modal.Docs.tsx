import { useBEM } from "../../hooks";
import { useState } from "react";
import { useAppDispatch } from "../../reduxHooks";
import { BGType } from "../../models/types"
import { dbAddHireDoc, hireFORCEIdle } from "../../store/slices/HireSlice";
import { addRef, dbAddDoc, dbGetDocs, selectDocs } from "../../store/slices/BackgroundSlice";
import { useSelector } from "react-redux";
import { changeModalShow, selectModalHireId } from "../../store/slices/AppSlice";
import { changeSelectedHireModal } from "../../store/slices/HireSlice";
import { idToStrArray } from "../../api-methods/dataMethods";

const ModalDocs = () => {

    const [B,E] = useBEM('modal-form');
    const dispatch = useAppDispatch();

    const [mdTitle, setMDTitle] = useState('');
    const [mdSize, setMDSize] = useState<number>();
    const [mdTypeStr, setMDTypeStr] = useState(['Educational Background','Previous Experience','Seminars Attended']);
    const [mdType, setMDType] = useState<BGType>();
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const Add = mdTypeStr.map(Add => Add)

    

    const stringToType = (value:string) => {
        switch(value) {
            case "0":
                setMDType(BGType.EDUCATION);
                break;
            case "1":
                setMDType(BGType.EXPERIENCE);
                break;
            case "2":
                setMDType(BGType.SEMINARS);
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
    const allDocs = useSelector(selectDocs);

    console.log('ALL DOCS IN STORE ------------')
    console.log(allDocs);

    const allHireDocs = allDocs
        .filter(doc => doc.docHireId === forHireId)
        .map(doc => {return doc.docId}); 
        
        console.log('allHireDocs: ')
        console.log(allHireDocs)
        console.log(idToStrArray(allHireDocs));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(changeSelectedHireModal(forHireId));

        var date = new Date();

        let maxId = 0;
        if (allDocs.length !== 0) {
            const allDocIds = allDocs.map(doc => {return doc.docId});
            maxId = Math.max(...allDocIds);   
        }

        let allFieldsFilled = [mdTitle].every(Boolean) && addRequestStatus === 'idle';
        if(mdType !== undefined && mdSize !== undefined && allFieldsFilled) {

            const newHDIds = allHireDocs.length === 0 ? idToStrArray([maxId+1]) : idToStrArray(allHireDocs.concat(maxId + 1));

            console.log('strArry: ');
            console.log(newHDIds);
            
            const newDoc = {
                docHireId: forHireId,
                docTitle: mdTitle,
                docSize: mdSize,
                docDate: date.toString().substr(4,11),
                docType: typeToString(mdType),
                docIsVerified: 0,
            }

            const newHireDoc = {
                hireDocs: newHDIds,
                hireId: forHireId
            }

            console.log('newHireDoc is:');
            console.log(newHireDoc);

            try {
                setAddRequestStatus('pending')
                dispatch(dbAddDoc(newDoc)).unwrap();
                dispatch(dbAddHireDoc(newHireDoc)).unwrap();
                
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                
                setAddRequestStatus('idle')
            }

            
            
            dispatch(changeModalShow(false))
        }
        console.log('DOCUMENT ADDED')
        dispatch(dbGetDocs());

        dispatch(hireFORCEIdle());
        
    }

    const closeModal = () => {
        dispatch(changeModalShow(false))
    }

    return(
        <div className={B()}>
            
            <form onSubmit={handleSubmit} className={E('form-cont')}>
                <span className={E('form-heading')}>Mock Document Submission</span>

                <div className={E('form-group')}>
                    <label htmlFor="mdoc-title" className={E('form-label')}>Title</label>
                    <input
                    className={E('text-input')}
                    type="text"
                    name="mdoc-title"
                    value={mdTitle}
                    onChange={(e) => setMDTitle(e.target.value)}/>
                </div>

                <div className={E('form-group')}>
                    <label htmlFor="mdoc-size" className={E('form-label')}>Size</label>
                    <input
                    className={E('text-input')}
                    type="number"
                    name="mdoc-size"
                    value={mdSize}
                    onChange={(e) => setMDSize(parseInt(e.target.value))}/>
                </div>

                <div className={E('form-group')}>
                    <label htmlFor="mref-type" className={E('form-label')}>Document Category</label>
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

export default ModalDocs;