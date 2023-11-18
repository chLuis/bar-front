import "./App.css";
import { DogPage } from './pages/allDogs'
import { SearchDogPage } from './pages/searchDog';
import { AltaDogPage } from "./pages/altaDog";
import { AgendaPage } from "./pages/agendaDogs";
import { Home } from "./pages/index";
import { Routes, Route } from "react-router-dom";

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
        </Routes>
        </div>
    );
}

export default App;
