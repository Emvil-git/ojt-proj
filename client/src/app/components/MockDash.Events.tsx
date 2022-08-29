import { selectEvents } from "../store/slices/EventSlice";
import { selectHires } from "../store/slices/HireSlice";
import { useBEM } from "../hooks";
import { iEvent } from "../models/event.interface";
import { useSelector } from "react-redux";
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import { useState } from "react";

interface Props {
    event: iEvent;
}

const DashEventCard:React.FC<Props> = (props) => {

    const [B,E] = useBEM('dash-event');
    const allHires = useSelector(selectHires);
    const [accShow, setAccShow] = useState(false);

    const partHires = allHires.filter(hire => props.event.eventParticipants.includes(hire.hireId));

    console.log('participants: ' + partHires);

    return(
        <div className={B()}>
            <span className={E('title')}>{props.event.eventName}</span>
            <span className={E('text-info')}>{props.event.eventDate}</span>
            <span className={E('text-info')}>{props.event.eventPlatform}</span>
            <section>
                <section onClick={() => setAccShow(!accShow)} className={E('text-info', 'sect')}><span>See Participants</span>
                {(accShow) ? <ChevronUp className={E('acc-icon')}/> : <ChevronDown className={E('acc-icon')}/>}
                {/* <ChevronDown/> */}
                </section>
                {/* {accShow && partHires.map(hire => <span className={E('text-info', 'accordion')}>{hire.hireName}</span>)} */}
                {accShow && <section className={E('part-accordion')}>
                        {partHires.map(hire => <span className={E('text-info', 'participant')}>{hire.hireName}</span>)}
                    </section>}
            </section>
        </div>
    )
}

export default DashEventCard;