import { useBEM } from "../../hooks";
import { useState } from "react";
import { useAppDispatch } from "../../reduxHooks";
import { BGType } from "../../models/types"
import { useSelector } from "react-redux";
import { addProgram, selectAssets, dbAddProgram, dbGetAssets, changeSelectedAssetModal } from "../../store/slices/AssetSlice";
import { changeModalShow, selectModalAssetId } from "../../store/slices/AppSlice";
import { iAsset, iProgram } from "../../models/asset.interface";
 
const ModalProgram = () => {

    const [B,E] = useBEM('modal-form');
    const dispatch = useAppDispatch();
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const forAssetId = useSelector(selectModalAssetId);
    const cAsset = useSelector(selectAssets).find(asset => asset.assetId === forAssetId) as iAsset;

    dispatch(changeSelectedAssetModal(forAssetId))

    const [mProgName, setMProgName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let allFieldsFilled = (mProgName !== "" && addRequestStatus == 'idle');

        if (allFieldsFilled){

            const newProg: iProgram = {
                progName:mProgName,
                isInstalled: false,
            }
    
            let newProgList: iProgram[] = [];
    
            if(cAsset?.assetPrograms !== null && cAsset?.assetPrograms !== undefined) {
                newProgList = newProgList.concat(cAsset.assetPrograms);
            }
    
            newProgList.push(newProg);
    
            const progListStr = newProgList.map(prog => JSON.stringify(prog));
    
            const updateProgram = {
               assetId: forAssetId,
               assetPrograms: progListStr.join(),
            }
    
            try {
                setAddRequestStatus('pending')
                dispatch(dbAddProgram(updateProgram)).unwrap();
                
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                
                setAddRequestStatus('idle')
            }
    
            dispatch(dbGetAssets());
            dispatch(changeModalShow(false))

        }       
    }

    const closeModal = () => {
        dispatch(changeModalShow(false))
    }

    return(
        <div className={B()}>
            
            <form onSubmit={handleSubmit} className={E('form-cont')}>
                <span className={E('form-heading')}>Add Program</span>

                <div className={E('form-group')}>
                    <label htmlFor="mref-name" className={E('form-label')}>Program Name</label>
                    <input
                    className={E('text-input')}
                    type="text"
                    name="mprog-name"
                    value={mProgName}
                    onChange={(e) => setMProgName(e.target.value)}/>
                </div>

                <input
                className={E('btn')}
                type="submit" />

                <button onClick={closeModal} className={E('close-btn')}>cancel</button>
            </form>
        </div>
    )
}

export default ModalProgram;