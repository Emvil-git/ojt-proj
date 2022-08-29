import { useBEM } from "../hooks";
import { CheckLg, Download } from 'react-bootstrap-icons';
import { iProgram } from "../models/asset.interface";

interface Props {
    prog: iProgram;
    assetId: number | undefined;
}

const HireAssetProgramitem: React.FC<Props> = (props) => {

    const [B,E] = useBEM('prog-item');

    return(
        <div className={B()}>
            {props.prog.isInstalled && <CheckLg/>}
            <span>{props.prog.progName}</span>
            {/* {!program.isInstalled && <Download onClick={() => handleInstall(program.progName)} className={E('icon-install')}/>} */}
        </div>
    )
}

export default HireAssetProgramitem;