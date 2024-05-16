import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./Components/it22324788/main/Main";

import ViewRice from "./Components/it22324788/viewStockLevels/viewRice/ViewRice";

import RiceVarieties from "./Components/it22324788/viewStockLevels/RiceVarieties/RiceVarieties";
import ViewPaddy from "./Components/it22324788/viewStockLevels/viewPaddy/ViewPaddy";
import AddRice from "./Components/it22324788/viewStockLevels/RiceVarieties/AddRiceV";
import UpdateRiceV from "./Components/it22324788/viewStockLevels/RiceVarieties/UpdateVariety";
import UpdatePaddy from './Components/it22324788/viewStockLevels/viewPaddy/UpdatePaddy';
import Dashboard from './Components/it22324788/Dashboard/Dashboard';

import ManageLocation from './Components/it22324788/locations/ManageLoc';
import AddLocation from "./Components/it22324788/locations/AddLocation";
import UpdateLocation from "./Components/it22324788/locations/UpdateLocation";

import GenerateReports from "./Components/it22324788/Reports/Reports";

import WorkersHome from "./Components/it22324788/Workers/Home/wHome";
import AddPaddy from "./Components/it22324788/Workers/Paddy/AddPaddy";

import Instructions from "./Components/it22324788/instructions/Instructions";
import WorkerInstructions from "./Components/it22324788/Workers/Instructions/wInstructions";
import Wdamages from "./Components/it22324788/Workers/damages/Damages";

import HomeYevin from "./Components/it22324788/Dashboard/Dashboard";
import HomeNalinda from "./Components/it22331786/Home/Home";











//tharaka







































//chathumin







































//nalinda
import Home from './Components/it22331786/Home/Home';
import EUsers from './Components/it22331786/UserDetails/EUsers';
import EaddUser from './Components/it22331786/EaddUser/EaddUser';
import EUpdate from './Components/it22331786/EUpdate/EUpdate';
import SalaryUsers from './Components/it22331786/UserDetails/SalaryUsers';
import SalaryaddUser from './Components/it22331786/EaddUser/SalaryAddUser';
import SalaryUpdate from './Components/it22331786/EUpdate/SalaryUpdate';
import Gehome from './Components/it22331786/Home/Gehome'































//manoj







































//senuri







































function App() {
  return (
    <div >
      <Router>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/yevin" element={<HomeYevin />} />

          <Route path="/manageLocation" element={<ManageLocation/>} />
          <Route path="/addLocation" element={<AddLocation/>} />
          <Route path="/manageLocation/:id" element={<UpdateLocation />} />{/*update location */}
          
          <Route path="/viewRice" element={<ViewRice />} />
          
          <Route path="/riceVarieties" element={<RiceVarieties />} />
          <Route path="/add-rice" element={<AddRice />} />
          <Route path="/riceVarieties/:id" element={<UpdateRiceV />} />{/*update rice variety */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/viewPaddy" element={<ViewPaddy />} />
          <Route path="/viewPaddy/:id" element={<UpdatePaddy />} />update paddy

          <Route path="/genReports" element= {<GenerateReports/>} />

          <Route path="/wHome" element={<WorkersHome/>}/>
          <Route path="/addPaddy" element={<AddPaddy/>}/>
          <Route path="/wInstructions" element={<WorkerInstructions/>}/>
          <Route path="/wdamages" element={<Wdamages/>}/>
          <Route path="/instructions" element={<Instructions/>}/>










        {/* nalinda */}
        <Route path="/nalinda" element={<HomeNalinda />} />
        <Route path="/nalinda" element={<HomeNalinda />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ecreate" element={<EUsers />} />
        <Route path='/eadd' element={<EaddUser />} />
        <Route path="/ecreate/:id" element={<EUpdate />} />
        <Route path="/screate" element={<SalaryUsers />} />
        <Route path='/sadd' element={<SalaryaddUser />} />
        <Route path="/screate/:id" element={<SalaryUpdate />} />
        <Route path="/gehome" element={<Gehome />} />





























        {/* tharaka */}







































{/* chathumin */}







































{/* manoj*/}







































{/* senuri */}







































        </Routes>
      </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
