import { useBEM } from "../hooks";
import {iDocument} from "../models/background.interface";
import { useSelector } from "react-redux";
import { selectHires } from "../store/slices/HireSlice";
import { FileEarmarkCheckFill } from 'react-bootstrap-icons'

interface Props {
    doc: iDocument;
}

const DocumentItem:React.FC<Props> = (props) => {

    const [B,E] = useBEM('doc-item');

    const hiresData = useSelector(selectHires);

    const hireIdToName = (hId: number) => {
        const cHire = hiresData.find(hire => hire.hireId === hId);
        return cHire?.hireName;
    }

    const sizeToString = () => {
        let sizeVal;
        switch (true) {
            case props.doc.docSize > Math.pow(2,30) :
                sizeVal = (props.doc.docSize/Math.pow(2,30)).toFixed(2);
                return sizeVal.toString() + ' GB';

            case props.doc.docSize > Math.pow(2,20) :
                sizeVal = (props.doc.docSize/Math.pow(2,20)).toFixed(2);
                return sizeVal.toString() + ' MB';

            case props.doc.docSize > Math.pow(2,10) :
                sizeVal = (props.doc.docSize/Math.pow(2,10)).toFixed(2);
                return sizeVal.toString() + ' KB';
            
            default :
                return (props.doc.docSize).toString() + ' B';
        }
    }

    const verifyIndicator = (isVerified: boolean) => {
        if (isVerified) return <FileEarmarkCheckFill className={E('doc-icon')}/>;
    } 

    return(
        <div className={B()}>
            <section className={E('data')}>
                <span>{props.doc.docTitle}</span>
                {verifyIndicator(props.doc.docIsVerified)}
            </section>
            <span className={E('data')}>{props.doc.docType}</span>
            <section className={E('data-cont')}>
                <div className={E('hire-icon')}></div>
                <span className={E('data')}>{hireIdToName(props.doc.docHireId)}</span>
            </section>
            <span className={E('data')}>{props.doc.docDate}</span>
            <span className={E('data')}>{sizeToString()}</span>
        </div>
    )
}

export default DocumentItem;