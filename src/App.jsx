import "./App.css";
import { DogPage } from './pages/allDogs'
import { SearchDogPage } from './pages/searchDog';
import { AltaDogPage } from "./pages/altaDog";
import { AgendaDogsPage } from "./pages/agendaDogs";
import { AlertDogTimePage } from './pages/alertDogTime'
import { Home } from "./pages/index";
import { EditDogPage } from './pages/editDog'
import { Routes, Route } from "react-router-dom";
import { Footer, BtnTop, Navbar } from './components';


function App() {
    return (
        <div className="allHtml">
        <Navbar />
        <div className="blur-overlay"></div>
        <div className="bodyApp">
        <Routes>
        <Route path="/" element={<Home />} />
            <Route path="/alldogs" element={<DogPage />} />
            <Route path="/altadogs" element={<AltaDogPage />} />
            <Route path="/searchdog" element={<SearchDogPage />} />
            <Route path="/agendadogs" element={<AgendaDogsPage />} />
            <Route path="/edit" element={<EditDogPage />} />
            <Route path="/alertdogtime" element={<AlertDogTimePage />} />
        </Routes>
        <BtnTop />
        <Footer />
        </div>
        </div>
    );
}

export default App;
