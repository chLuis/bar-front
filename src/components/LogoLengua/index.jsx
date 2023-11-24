import logo from '../../assets/images/LogoLenguaAfuera.jpeg'
import './logoLengua.css'

export const LogoLengua = () => {
    return (
        <div className='img-logo' id='LogoLengua'>
            <img className="home-img" src={logo} alt="home-img" width={220}/>
        </div>
    )
}