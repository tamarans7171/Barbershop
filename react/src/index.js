import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//components
import App from './App';
import Myqueues from './components/clients/Myqueues/Myqueues';
import About from './components/clients/About/About';
import Shop from './components/clients/Shop/Shop';
import Appointments from './components/clients/Appointments/Appointments'
import HairDressers from './components/clients/HairDressers/HairDressers'
import Employee from './components/employees/Enter/enter'
import Option from './components/clients/Appointments/Option/Option'
import Schedual from './components/employees/Schedual/Schedual'

import { Provider } from 'react-redux';
import store from './redux/MyRedux/store'
import ButtonsLog from './components/clients/Login/buttonsLog'
import EditDetails from './components/employees/EditDetails/editDetails';
import AddAppointmentByHairDresser from './components/clients/addAppointmentByHairDresser/addAppointmentByHairDresser';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ButtonsLog />} />
        <Route path='/home' element={<App />} >
          <Route path='/home' element={<Appointments />}></Route>
          <Route path='Myqueues' element={<Myqueues />}></Route>
          <Route path='About' element={<About />}></Route>
          <Route path='Shop' element={<Shop />}></Route>
          <Route path='HairDressers' element={<HairDressers />}></Route>
          <Route path='HairDressers/:id' element={<AddAppointmentByHairDresser />}></Route>

          <Route path='Employee' element={<Employee />}></Route>
          <Route path='Option' element={<Option />}></Route>
          <Route path='emp' element={<Schedual />}></Route>
          <Route path='editDetails' element={<EditDetails />}></Route>
        </Route>

      </Routes>
    </BrowserRouter>


  </Provider>
  ,
  document.getElementById('root')
);

reportWebVitals();

