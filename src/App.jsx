import "./App.css";
import { AltaDog } from "./components";
import { DogPage } from './pages/allDogs'
import { SearchDogPage } from './pages/searchDog';
import { Home } from "./pages/index";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div>
        <div className="blur-overlay"></div>
        <Routes>
        <Route path="/" element={<Home />} />
            <Route path="/alldogs" element={<DogPage />} />
            <Route path="/altadogs" element={<AltaDog />} />
            <Route path="/searchdog" element={<SearchDogPage />} />
        </Routes>
        </div>
    );
}

export default App;
