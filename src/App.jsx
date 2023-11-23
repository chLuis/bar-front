import "./App.css";
import { DogPage } from './pages/allDogs'
import { SearchDogPage } from './pages/searchDog';
import { AltaDogPage } from "./pages/altaDog";
import { AgendaPage } from "./pages/agendaDogs";
import { Home } from "./pages/index";
import { EditDogPage } from './pages/editDog'
import { Routes, Route } from "react-router-dom";
//import { EditDog } from './components';


function App() {
    return (
        <div>
        <div className="blur-overlay"></div>
        <Routes>
        <Route path="/" element={<Home />} />
            <Route path="/alldogs" element={<DogPage />} />
            <Route path="/altadogs" element={<AltaDogPage />} />
            <Route path="/searchdog" element={<SearchDogPage />} />
            <Route path="/agenda" element={<AgendaPage />} />
            <Route path="/edit" element={<EditDogPage />} />
        </Routes>
        </div>
    );
}

export default App;
