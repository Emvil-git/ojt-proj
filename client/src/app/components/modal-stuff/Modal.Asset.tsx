import { useBEM } from "../../hooks";
import { useState } from "react";
import { useAppDispatch } from "../../reduxHooks";
import { BGType } from "../../models/types"
import { useSelector } from "react-redux";
import { assignAsset, selectAssets, dbAssignAsset, dbGetAssets } from "../../store/slices/AssetSlice";
import { dbHireAssignAsset, dbGetHires } from "../../store/slices/HireSlice";
import { changeModalShow, selectModalHireId } from "../../store/slices/AppSlice";
 
const ModalAsset = () => {

    const [B,E] = useBEM('modal-form');
    const dispatch = useAppDispatch();
    const forHireId = useSelector(selectModalHireId);

    const [mAssetId, setMAssetId] = useState<number | undefined>();
    const [mAssetName, setMAssetName] = useState('');

    const allAssets = useSelector(selectAssets);
    console.log(allAssets)
    const unassignedAssets = allAssets?.filter(asset => asset.assetHireId === null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mAssetId !== undefined) {

            const assignAssetInfo = {
                assetId: mAssetId,
                assetHireId: forHireId,
            }

            console.log('assignAssetInfo :');
            console.log(assignAssetInfo);

            const hireAssignAssetInfo = {
                hireAsset: mAssetId,
                hireId: forHireId,
            }

            console.log('hireAssignAssetInfo :');
            console.log(hireAssignAssetInfo);

            dispatch(dbAssignAsset(assignAssetInfo));

            dispatch(dbHireAssignAsset(hireAssignAssetInfo));

            dispatch(changeModalShow(false))
        }

        dispatch(dbGetAssets());
        dispatch(dbGetHires());
    }

    const closeModal = () => {
        dispatch(changeModalShow(false))
    }

    return(
        <div className={B()}>
            
            <form onSubmit={handleSubmit} className={E('form-cont')}>
                <section>
                    <span className={E('form-heading')}>Assign Asset</span>
                </section>

                <div className={E('form-group')}>
                    <label htmlFor="mref-type" className={E('form-label')}>Select Asset</label>
                    <select onChange={ev => setMAssetId(Number(ev.target.value))} className={E('form-dropdown')} name="" id="">
                        <option className={E('form-dropdown--option')} disabled selected value="">Select an Available Asset</option>
                        {unassignedAssets?.map(asset => <option className={E('form-dropdown--option')} value={asset.assetId}>{asset.assetName}</option>)}
                        
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

export default ModalAsset;