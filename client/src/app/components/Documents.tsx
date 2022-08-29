import { useBEM } from "../hooks";
import DocumentItem from "./DocumentItem";
import { selectDocs } from "../store/slices/BackgroundSlice";
import { useSelector } from "react-redux";
import { useState } from "react";

const Documents = () => {
    const docsData = useSelector(selectDocs);
    const [B,E] = useBEM('documents');
    const [search, setSearch] = useState('');

    const dynamicSearch = () => {
        return  docsData
        .filter(doc => doc.docTitle.toLowerCase().includes(search.toLowerCase()))
        .map(
            doc => {
                return Array.isArray(doc) ? <DocumentItem doc={doc[0]}/> : <DocumentItem doc={doc}/>
            }
        )
    }

    return(
        <div className={B()}>
            <div className={E('header')}>
                <h4 className={E('header', 'title')}>Documents</h4>

                <section className={E('actions')}>
                    <input className={E('searchbox')} type="text"
                        placeholder="Search "
                        value ={search}
                        onChange = {(ev) => setSearch(ev.target.value)}
                    />
                </section>
            </div>

            <div className={E('docs-list')}>
                <section className={E('docs-list','heading')}>
                    <span>Title</span>
                    <span>Category</span>
                    <span>Owner</span>
                    <span>Date</span>
                    <span>Size</span>
                </section>
                <section className={E('docs-list','entries')}>
                    {dynamicSearch()}
                    {/* {docsData.map(doc => <DocumentItem doc={doc}/>)} */}
                    {/* {docsData.map(doc => <DocumentItem title={doc.title} category={doc.category} type={doc.type} owner={doc.owner} dateAdded={doc.dateAdded} isVerified={doc.isVerified} size={doc.size}/>)} */}
                    {/* <DocumentItem/>
                    <DocumentItem/>
                    <DocumentItem/>
                    <DocumentItem/>
                    <DocumentItem/>
                    <DocumentItem/>
                    <DocumentItem/>
                    <DocumentItem/>
                    <DocumentItem/>
                    <DocumentItem/>
                    <DocumentItem/>
                    <DocumentItem/> */}
                </section>
            </div>
        </div>
    )
}

export default Documents;