import { useBEM } from "../hooks"
import { iAsset, iProgram } from "../models/asset.interface"
import { useSelector } from 'react-redux';
import { selectAssets, installProgram, dbAddProgram } from "../store/slices/AssetSlice";
import { changeModalAssetId, changeModalShow, changeModalViewType } from "../store/slices/AppSlice";
import { ModalType } from "../models/types";
import { useAppDispatch } from "../reduxHooks";
import { CheckLg, Download } from 'react-bootstrap-icons';
import { useState } from "react";
import HireAssetProgramitem from "./Hire.AssetProgramItem";

interface Props{
    hireAssetId: number;
}

const HireAssetItem:React.FC<Props> = (props) => {

    const allAssets = useSelector(selectAssets);
    const [B,E] = useBEM('hire-asset');
    const dispatch = useAppDispatch();
    const [reqStatus, setReqStatus] = useState('idle');

    let cAsset = allAssets.find(asset => asset.assetId === props.hireAssetId);
    let cProgList = cAsset?.assetPrograms;

    console.log(allAssets);
    console.log(cAsset);

    const modalAddProgram = () => {
        dispatch(changeModalViewType(ModalType.MPROGRAM));
        dispatch(changeModalAssetId(props.hireAssetId));
        dispatch(changeModalShow(true));
    }

    const handleInstall = (progName: string) => {

        if (reqStatus === 'idle') {
            if(cAsset !== undefined && cAsset?.assetPrograms !== null && cAsset?.assetPrograms !== undefined) {

                
                dispatch(installProgram({
                    assetId: cAsset.assetId,
                    assetProgName: progName,
                }))
        
                const progList: iProgram[] | string[] = cAsset.assetPrograms.filter(() => true);
        
                let progListStr = progList.map(prog => JSON.stringify(prog))
    
                progListStr = progListStr.map(progStr => {
                    if(progStr.includes(`${progName}`)) {
                        console.log('FOUND IT')
                        console.log(progStr);
                        progStr = progStr.replace('\"isInstalled\":false','\"isInstalled\":true');
                        console.log(progStr);
                    }
                    return progStr;
                })

                console.log(progListStr);

                const updateProgram = {
                    assetId: cAsset.assetId,
                    assetPrograms: progListStr.join()
                }

                console.log('INSTALLING PROGRAM.....')
                console.log(updateProgram)

                try {
                    setReqStatus('pending')
                    dispatch(dbAddProgram(updateProgram)).unwrap();
                    
                } catch (err) {
                    console.error('Failed to save the post', err)
                } finally {
                    
                    setReqStatus('idle')
                }
            }
        }

    }

    return (
        <div className={B()}>
            <span>{cAsset?.assetName}</span>
            <section className={E('program-list')}>
                {cProgList?.map(program => 
                    <section className={E('program-item')}>
                        <span>{program.progName}</span>
                        {(program.isInstalled) ? <CheckLg/> : <Download onClick={() => handleInstall(program.progName)} className={E('icon-install')}/> }
                    </section>
                )}
                <button className={E('btn')} onClick={modalAddProgram}> Add Program </button>
            </section>
        </div>
    )
}

export default HireAssetItem;