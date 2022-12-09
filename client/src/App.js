import React from 'react';
import { Route } from 'react-router-dom'; //creat routes

import Countries from './components/countries.jsx';
import CreateAct from './components/createAct.jsx';
import Detail from './components/detail.jsx';
import Filter from './components/filter.jsx';
import { Landing } from './components/landingPage.jsx';
import NavBar from './components/navBar.jsx';







function App() {
  

  console.log("APP")
  
  return (
    <React.Fragment>
    <Route exact path={"/"}><Landing></Landing></Route>
    <Route exact path={"/country"}><NavBar/></Route>
    <Route exact path={"/country"}><Filter/></Route>
    <Route exact path={"/country"}><Countries/></Route>
    <Route exact path={"/country/detail/:id"}><Detail/></Route>
    <Route exact path={"/country/activity"}><CreateAct/></Route>
    </React.Fragment>
    


  );
}

export default App;
