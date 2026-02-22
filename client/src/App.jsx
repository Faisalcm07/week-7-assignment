import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import PlantDetails from "./pages/PlantDetails";
import GetPlants from "./pages/PlantsPage";
import { Link } from "react-router";


import './App.css'
import AddPlant from "./pages/AddPlant";

function App() {

  return(

    <div><h2 className="text-2xl font-mono text-amber-300">Plants App</h2>
            <nav className="flex flex-row gap-5">
                <Link to='/'>Home</Link>
                <Link to='/plants'>Plants</Link>
                <Link to='/addplant'>Add Plant</Link>


             
            </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plants/:id" element={<PlantDetails/>} />
        <Route path="/plants" element={<GetPlants/>} />
        <Route path="/addplant" element={<AddPlant/>} />

        
      </Routes>
</div>
       
   


  )
 
}

export default App
