import React from 'react';
import './App.css';
import Navigationbar from './components/Navigationbar';
import GlobalStats from './components/GlobalStats';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PieGraph from './components/PieGraph'


function App() {
  return (
    <div className="App">
      <Navigationbar/>
      <GlobalStats />
      {/* <PieChartcomp/> */}
      
    </div>
  );
}

export default App;
