import { useBEM } from './app/hooks';
import { ViewType } from './app/models/types';
import React, { useEffect, useState } from 'react';
import SideNav from './app/components/SideNav';
import MockDash from './app/components/MockDash';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import Documents from './app/components/Documents';
import Hires from './app/components/Hires';
import Lost from './app/components/404';
import AppModal from './app/components/App.Modal';
import { selectModalShow, selectLoadingShow } from './app/store/slices/AppSlice';
import LoadingPage from './app/components/Loading';
import { useAppDispatch } from './app/reduxHooks';
import { dbGetHires } from "./app/store/slices/HireSlice";
import { dbGetRefs, dbGetDocs } from "./app/store/slices/BackgroundSlice";
import { dbGetAssets } from "./app/store/slices/AssetSlice";
import { dbGetEvents } from "./app/store/slices/EventSlice";


function App() {

  // CONSTANTS
  const [B,E] = useBEM('app');
  const [modalShow, setModalShow] = useState(false);
  const [willInit, setWillInit] = useState(true);
  const pageView =  useSelector((state: RootState) => state.appReds.view)

  const dispatch = useAppDispatch();

  const isModalshow = useSelector(selectModalShow);
  const isLoadingShow = useSelector(selectLoadingShow);

  // METHODS
  const dynamicView = () => {
    switch(pageView) {
      case ViewType.DASHBOARD:
        return(<MockDash/>);
        break;

      case ViewType.DOCUMENTS:
        return(<Documents/>);
        break;

      case ViewType.HIRES:
        return(<Hires/>);
        break;
      
      case ViewType.LOST:
        return(<Lost/>);
        break;
    }
  }

  useEffect(() => {
    console.log('we on, baby')
    if (willInit) {
      dispatch(dbGetHires());
      dispatch(dbGetRefs());
      dispatch(dbGetDocs());
      dispatch(dbGetEvents());
      dispatch(dbGetAssets());
      setWillInit(false);
    }
  },[dispatch])

  return (
    <div className={B()}>
      {isLoadingShow && <LoadingPage/>}
      {isModalshow && <AppModal/>}
      <SideNav/>
      <div className={E('body')}>
        <div className={E('header')}>
          <h2 className={E('header','title')}>Onboarding App</h2>
        </div>

        {dynamicView()}
      </div>
    </div>
  );
}

export default App;
