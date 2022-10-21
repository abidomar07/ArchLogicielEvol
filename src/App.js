import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import ListComptesComponent from './components/CompteComponents/ListCompteComponent';

import ListClientComponent from './components/clientComponents/ListClientsComponent';
import UpdateClientComponent from './components/clientComponents/UpdateClientComponent';
import CreateClientComponent from './components/clientComponents/CreateClientComponent';


function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/comptes" component = {ListComptesComponent}></Route>
                          <Route path = "/" exact component = {ListEmployeeComponent}></Route>
                          <Route path = "/employees" component = {ListEmployeeComponent}></Route>
                          <Route path = "/add-employee/:id" component = {CreateEmployeeComponent}></Route>
                          <Route path = "/view-employee/:id" component = {ViewEmployeeComponent}></Route>
                          {/* <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}
                          <Route path = "/clients/all" component = {ListClientComponent}></Route> 
                          <Route path = "/clients/update/:cinId" component = {UpdateClientComponent}></Route> 
                          <Route path = "/add-client/:cinId" component = {CreateClientComponent}></Route> 
                          
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
