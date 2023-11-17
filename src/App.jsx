import "./App.css";
import { Dogs, AltaDog, SearchDog } from "./components";
import {Home} from "./pages/index";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div>
        <div className="blur-overlay"></div>
        <Routes>
        <Route path="/home" element={<Home />} />
            <Route path="/home/alldogs" element={<Dogs />} />
            <Route path="/home/altadogs" element={<AltaDog />} />
            <Route path="/home/searchdog" element={<SearchDog />} />
        </Routes>
        </div>
    );
}

export default App;
