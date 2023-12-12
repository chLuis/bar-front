import logo from '../../assets/images/LogoLenguaAfuera.jpeg'
import './logoLengua.css'
import { Link } from 'react-router-dom'

export const LogoLengua = () => {
    return (
        <div className='allLogo'>
        <div className='container-logo' id='LogoLengua'>
        <div className='img-logo'>
            <Link to="/"><img className="home-img" src={logo} alt="home-img" width={120}/></Link>
            </div>
        <div className='container-logo-bottom'></div>
        </div>
        </div>
    )
}