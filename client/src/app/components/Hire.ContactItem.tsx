import { useBEM } from "../hooks"
import { iHireContact } from "../models/hire.interface"
import { EnvelopeFill, PhoneFill } from 'react-bootstrap-icons';

interface Props {
    info: iHireContact
}

const ContactItem:React.FC<Props> = (props) => {

    const [B,E] = useBEM('hire-contact')

    return (
        <div className={B()}>
            <section className={E('group')}>
                <EnvelopeFill className={E('icon')}/>
                <span className={E('text')}>{props.info.email}</span>
            </section>
            <section className={E('group')}>
                <PhoneFill className={E('icon')}/>
                <span className={E('text')}>{props.info.phone}</span>
            </section>
        </div>
    )
}

export default ContactItem;