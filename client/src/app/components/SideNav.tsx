import React from "react";
import { useBEM } from "../hooks";
import { useDispatch } from "react-redux";
import { changeView } from "../store/slices/AppSlice";
import { ViewType } from "../models/types";

const SideNav = () => {

    // CONSTANTS
    const [B,E] = useBEM('sidenav');
    const dispatch = useDispatch();

    // METHODS

    const viewChanger = (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();

        const button: HTMLButtonElement = ev.currentTarget;
        switch(button.name) {
            case 'DASHBOARD':
                dispatch(changeView(ViewType.DASHBOARD));
                break;
            case 'HIRES':
                dispatch(changeView(ViewType.HIRES));
                break;
            case 'DOCUMENTS':
                dispatch(changeView(ViewType.DOCUMENTS));
                break;
            default:
                dispatch(changeView(ViewType.LOST));
        }
    }

    return(
        <div className={B()}>
            <section className={E('header')}></section>
            <section className={E('links')}>
                <button className={E('link')} name='DASHBOARD' onClick={viewChanger}>DASHBOARD</button>
                <button className={E('link')} name='HIRES' onClick={viewChanger}>HIRES</button>
                <button className={E('link')} name='DOCUMENTS' onClick={viewChanger}>DOCUMENTS</button>
            </section>
        </div>
    )
}

export default SideNav;
