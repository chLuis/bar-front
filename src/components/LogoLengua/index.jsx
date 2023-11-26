import logo from '../../assets/images/LogoLenguaAfuera.jpeg'
import './logoLengua.css'

export const LogoLengua = () => {
    return (
        <div className='allLogo'>
        <div className='container-logo' id='LogoLengua'>
        <div className='img-logo'>
            <img className="home-img" src={logo} alt="home-img" width={200}/>
            </div>
        <div className='container-logo-bottom'></div>
        </div>
        </div>
    )
}