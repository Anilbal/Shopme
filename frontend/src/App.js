import React from 'react'
import MyRoutes from './MyRoutes'
import './App.css'
import { Provider } from 'react-redux'
import { store } from './reducers/store'
import LocomotiveScroll from 'locomotive-scroll';


const App = () => {
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <>
    <Provider store={store}>
      <MyRoutes/>
    </Provider>
    </>
  )
}

export default App