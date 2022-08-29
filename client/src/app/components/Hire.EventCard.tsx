import { useSelector } from "react-redux";
import { useBEM } from "../hooks";
import { iEvent } from "../models/event.interface";
import { selectEvents } from "../store/slices/EventSlice";

interface Props {
    eventId: number
}



const HireEventCard:React.FC<Props> = (props) => {
    const [B,E] = useBEM('hire-event');
    const allEvents = useSelector(selectEvents);
    const selectedEvent = allEvents?.find(event => event.eventId === props.eventId);

    console.log('All Events: ' + allEvents)
    console.log(selectedEvent)

    return(
        <div className={B()}>
            <span className={E('title')}>{selectedEvent?.eventName}</span>
            <span className={E('date')}>{selectedEvent?.eventDate}</span>
            <span className={E('platform')}>{selectedEvent?.eventPlatform}</span>
        </div>
    )
}

export default HireEventCard;