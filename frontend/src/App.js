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
import HomeManoj from "./Components/it22901712/Home/Home";










//tharaka







































//chathumin







































//nalinda
































//manoj
import Users from './Components/it22901712/UserDetails/Users';
import AddUser from './Components/it22901712/AddUser/AddUser';
import Update from './Components/it22901712/Update/Update';
import AddUser1 from './Components/it22901712/AddUser/AddUser1';
import Users1 from './Components/it22901712/UserDetails/Users1';
import Update1 from './Components/it22901712/Update/Update1';
import Users2 from './Components/it22901712/UserDetails/Users2';
































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
       





























        {/* tharaka */}







































{/* chathumin */}







































{/* manoj*/}
<Route path="/manoj" element={<HomeManoj />} />
<Route path="/mainHome" element={<HomeManoj />} />
<Route path="/create" element={<Users />} />
<Route path='/add' element={<AddUser/>}/>
<Route path="/create/:id" element={<Update />} />
<Route path='/add1' element={<AddUser1/>}/>
<Route path="/create1" element={<Users1 />} />
<Route path="/create1/:id" element={<Update1 />} />
<Route path="/create2" element={<Users2 />} />






























{/* senuri */}







































        </Routes>
      </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
