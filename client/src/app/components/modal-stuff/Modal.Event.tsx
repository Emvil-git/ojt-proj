import { useBEM } from "../../hooks";
import { useState } from "react";
import { useAppDispatch } from "../../reduxHooks";
import { useSelector } from "react-redux";
import { addHireEvent ,selectHires, dbHireAddEvent } from "../../store/slices/HireSlice";
import { iHire } from "../../models/hire.interface";
import { addEvent, selectEvents, dbAddEvents } from "../../store/slices/EventSlice";
import { changeModalShow, selectModalAssetId } from "../../store/slices/AppSlice";
import { idToStrArray } from "../../api-methods/dataMethods";
import { iEvent } from "../../models/event.interface";

const ModalEvents = () => {

    const [B,E] = useBEM('modal-form');
    const [mEvName, setMEvName] = useState('');
    const [mEvDate, setMEvDate] = useState('');
    const [mEvPlatform, setMEvPlatform] = useState('');
    const [mEvLink, setMEvLink] = useState('');
    const [mEvPart, setMEvPart] = useState<number[] | undefined>([]);
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const allEvents = useSelector(selectEvents);
    const allHires = useSelector(selectHires);

    console.log(allEvents)

    let tempParticipants: number[] = [];

    const dispatch = useAppDispatch();

    const Add = ["MS Teams", "On-Site"]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('MODAL: temp participants: ' + tempParticipants)

        let maxId = 0;
        if (allEvents) {
            const allEventIds = allEvents.map(event => {return event.eventId});
            allEvents.length === 0 ? maxId = 1 : maxId = Math.max(...allEventIds) + 1
        }

        let allFieldsFilled = [mEvName, mEvDate, mEvPlatform].every(Boolean) && tempParticipants.length !== 0 && addRequestStatus === 'idle'

        if (allFieldsFilled) {

            console.log('maxId: ' + maxId);

            const newEvent = {
                eventName: mEvName,
                eventDate: mEvDate,
                eventPlatform: mEvPlatform,
                eventLink: mEvLink,
                eventParticipants: idToStrArray(tempParticipants),
            }

            console.log(newEvent);

            try {
                setAddRequestStatus('pending')
                dispatch(dbAddEvents(newEvent)).unwrap();
                
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally { 
                setAddRequestStatus('idle')
            }

            console.log('MODAL: event participants: ' + mEvPart)

            const hParticipants = allHires.filter(
                hire => 
                tempParticipants.indexOf(hire.hireId) !== -1
            )

            console.log(hParticipants);

            hParticipants.map(part => {
                console.log(part)

                let strEventIds = '';

                if (part.hireEvents !== null && part.hireEvents.length !== 0) {
                    strEventIds = strEventIds.concat(idToStrArray(part.hireEvents)+',')
                }

                strEventIds = strEventIds.concat(maxId.toString())

                console.log('event ids as string: ' + strEventIds);

                const hireAddEvent = {
                    hireId: part.hireId,
                    hireEventIds: strEventIds, 
                }

                try {
                    setAddRequestStatus('pending')
                    dispatch(dbHireAddEvent(hireAddEvent)).unwrap();

                    } catch (err) {
                        console.error('Failed to save the post', err)
                    } finally {

                        setAddRequestStatus('idle')
                    }
                
            })
            
            dispatch(changeModalShow(false))
        }

        
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        
        const checkedValue = e.target.value;

        const valToInt = parseInt(checkedValue)

        const itemIndex = tempParticipants.indexOf(valToInt);

        checked ? tempParticipants.push(valToInt) : tempParticipants.splice(itemIndex, 1)

        console.log(tempParticipants)
        };

    const closeModal = () => {
        dispatch(changeModalShow(false))
    }

    return(
        <div className={B()}>
            
            <form onSubmit={handleSubmit} className={E('form-cont')}>
                <span className={E('form-heading')}>New Event</span>

                <div className={E('form-group')}>
                    <label htmlFor="mev-name" className={E('form-label')}>Event Name</label>
                    <input
                    className={E('text-input')}
                    type="text"
                    name="mev-name"
                    value={mEvName}
                    onChange={(e) => setMEvName(e.target.value)}/>
                </div>

                <div className={E('form-group')}>
                    <label htmlFor="mev-date" className={E('form-label')}>Event Date</label>
                    <input
                    className={E('text-input')}
                    type="datetime-local"
                    name="mev-date"
                    value={mEvDate}
                    onChange={(e) => setMEvDate(e.target.value)}/>
                </div>

                <div className={E('form-group')}>
                    <label htmlFor="mref-type" className={E('form-label')}>Reference Category</label>
                    <select onChange={ev => setMEvPlatform(ev.target.value)} className={E('form-dropdown')} name="" id="">
                        <option className={E('form-dropdown--option')} disabled selected value="">Select a Platform</option>
                        {
                        Add.map((type, key) => <option value={type}>{type}</option>)
                        }
                    </select>
                </div>

                <div className={E('form-group')}>
                    <label htmlFor="mev-link" className={E('form-label')}>Event Link (Optional)</label>
                    <input
                    className={E('text-input')}
                    type="text"
                    name="mev-link"
                    value={mEvLink}
                    onChange={(e) => setMEvLink(e.target.value)}/>
                </div>

                <div className={E('form-group')}>
                    <span className={E('form-label')}>Participants</span>
                    <div className={E('form-checkbox-group')}>
                        {allHires.map(hire => 
                            <section className={E('form-checkbox-options')}>
                                <input onChange={handleChange} type="checkbox" value={hire.hireId} />
                                <label> {hire.hireName}</label>                       
                            </section>
                            )}
                    </div>
                </div>
                
                <input
                className={E('btn')}
                type="submit" />

                <button onClick={closeModal} className={E('close-btn')}>cancel</button>
            </form>
        </div>
    )
}

export default ModalEvents;