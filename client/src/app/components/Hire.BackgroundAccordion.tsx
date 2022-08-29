import { useBEM } from "../hooks";
import { useEffect, useState } from "react";
import ReferenceItem from "./Hire.ReferenceItem";
import { BGType } from "../models/types";
import { selectDocs, selectRefs } from "../store/slices/BackgroundSlice";
import { useSelector } from "react-redux";
import { BGIdsType } from "../models/types";
import { iDocument, iReference } from "../models/background.interface";
import HDocItem from "./Hire.DocItem";
import { QuestionCircleFill, CheckCircleFill } from 'react-bootstrap-icons';

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

interface Props{
    name: string;
    type: string;
    toggle: (key: string) => void;
    open: boolean;
    hireId: number;
    hireBGIds: BGIdsType;
}




const BackgroundAccordion:React.FC<Props> = (props) => {

    const [B,E] = useBEM('hire-bg');
    const [isVerified, setIsVerified] = useState(false);
    const [hRefs, setHRefs] = useState<iReference[]>([]);
    const [hDocs, setHDocs] = useState<iDocument[]>([]);

    const verify = {
        refs: useSelector(selectRefs),
        docs: useSelector(selectDocs),
    }

    const verifyIDs = {
        hireRefs: props.hireBGIds.cHireRefIds,
        docIds: props.hireBGIds.cHireDocIds,
    }

    

    let hireRefsUnfiltered = verify.refs?.filter(
        item => item.refHireId === props.hireId
    );

    console.log('hireRefsUnfiltered: ')
    console.log(hireRefsUnfiltered)

    let hireDocsUnfiltered = verify.docs?.filter(
        item => item.docHireId === props.hireId
    );

    let hireRefsCategory = hireRefsUnfiltered?.filter(
        item => item.refType === props.type
    )

    console.log('hireRefsCategory: ')
    console.log(hireRefsCategory)

    let hireDocsCategory = hireDocsUnfiltered?.filter(
        item => item.docType === props.type
    )

    const handleIndicator = () => {
        if(!isVerified) return <QuestionCircleFill style={{color: '#a4a4a4'}}/>;
        return <CheckCircleFill style={{color: '#0086d6'}}/>;
    }

    useEffect(
        () => {
            let refsVerified: boolean | undefined = false;
            let docsVerified: boolean | undefined = false;

            if (hireRefsCategory !== undefined) {
                refsVerified = hireRefsCategory?.every(ref => ref.refIsContacted)
            }

            if (hireDocsCategory !== undefined) {
                docsVerified = hireDocsCategory?.every(doc => doc.docIsVerified)
            }

            if (hireRefsCategory?.length == 0) { refsVerified = false }
            if (hireDocsCategory?.length == 0) { docsVerified = false }

            if (docsVerified && refsVerified) {
                setIsVerified(true);
            }
        },
    [verify.refs, verify.docs])

    useEffect(
        () => {
            setHRefs(verify.refs);
            setHDocs(verify.docs);
        }
    , [verify.refs, verify.docs])

    return(
        <div className={B()}>
            <section onClick={() => props.toggle(props.name)} className={E('heading')}>
                <section className={E('indicator')}>
                    {handleIndicator()}
                </section>
                <span className={E('heading--title')}>{props.name}</span>
            </section>

            {props.open && 
                <section className={E('contacts')}>
                    {hireRefsCategory?.map(ref =>
                        <ReferenceItem bgRef={ref}/>)}

                    {hireDocsCategory?.map(doc =>
                        <HDocItem bgDoc={doc}/>)}
                </section>
            }
            
        </div>
    );
}

export default BackgroundAccordion;