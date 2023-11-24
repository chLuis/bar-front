import "./App.css";
import { DogPage } from './pages/allDogs'
import { SearchDogPage } from './pages/searchDog';
import { AltaDogPage } from "./pages/altaDog";
import { AgendaPage } from "./pages/agendaDogs";
import { Home } from "./pages/index";
import { EditDogPage } from './pages/editDog'
import { Routes, Route } from "react-router-dom";
import { Footer, BtnTop } from './components';


function App() {
    return (
        <div className="allHtml">
        <div className="blur-overlay"></div>
        <div className="bodyApp">
        <Routes>
        <Route path="/" element={<Home />} />
            <Route path="/alldogs" element={<DogPage />} />
            <Route path="/altadogs" element={<AltaDogPage />} />
            <Route path="/searchdog" element={<SearchDogPage />} />
            <Route path="/agenda" element={<AgendaPage />} />
            <Route path="/edit" element={<EditDogPage />} />
        </Routes>
        <BtnTop />
        <Footer />
        </div>
        </div>
    );
}

export default App;
