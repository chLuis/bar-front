import "./navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import  LogoLengua from "../../assets/images/LogoLenguaAfuera.jpeg"
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import { useQuery,useMutation, useQueryClient, Query  } from '@tanstack/react-query'
import { getUser } from '../../api/userAPI.js'
import Swal from 'sweetalert2'


export const Navbar = (props) => {

  const route = props.route;

  //const queryClient = useQueryClient();
  // const Toast = Swal.mixin({
  //   toast: true,
  //   position: "top-end",
  //   zIndex: 11,
  //   showConfirmButton: false,
  //   timer: 2000,
  //   timerProgressBar: true,
  //   didOpen: (toast) => {
  //     toast.onmouseenter = Swal.stopTimer;
  //     toast.onmouseleave = Swal.resumeTimer;
  //   }
  // });

      // Toast.fire({
      //     title: 'Usuario conectado!',
      //     icon: 'success',
      // })



//user? console.log(user):console.log("No hay usuario")

    const [showMenu, setShowMenu] = useState(false);
    const [modalLoginShow, setModalLoginShow] = useState(false)


  function cambiarvalor() {
    setModalLoginShow(!modalLoginShow)
  }
  function showModalLogin() {
    setModalLoginShow(!modalLoginShow);
  }
    const toggleMenu = () => {
      setShowMenu(!showMenu);
      setIsOpen(!isOpen)
    };
    const  handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const user = Object.fromEntries(formData);
      //const data = await getUser(user)
     
      }

      const [isOpen, setIsOpen] = useState(false);

    return (

      <nav className={`navbar ${showMenu ? 'active' : ''}`}>
      {modalLoginShow && <div className="modal-login">
            <img src={LogoLengua} alt="LogoLengua" width={120} className="logoLengaLogin"></img>
            <h3>¡Hola!</h3>
            <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch'},
            }}noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            >
            <div className="login-div-input">
              <TextField className="login-inputs" id="outlined-basic" name="name" label="Usuario" variant="outlined" />
              <TextField className="login-inputs" id="filled-basic" type="password" name="password" label="Contraseña" variant="outlined" />

            </div>
            <div>
            <button type="submit" className="btn-login-log">Entrar</button>
            <button className="btn-login-cancel" onClick={cambiarvalor}>Cerrar</button>
            </div>
            </Box>
        </div>}
        <div className="navbar-container">
          <div className={`navbar-toggle2 ${isOpen && "open"}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="navbar-btn-log">
            <Link onClick={showModalLogin}><i className="fa-solid fa-user"></i></Link>
          </div>
            <div className="navbarRoute">
              <Link to="/" className="navbar-LinkRoute">Home</Link>
              <span>|</span>
              <Link className="navbar-LinkRoute">{route}</Link>
            </div>
        </div>
        <div onClick={toggleMenu} className={`mobile-menu ${showMenu ? 'active' : ''}`}>
          <div className="navbar-pelu-div"><Link to={"/"} className="navbarToHome">Inicio</Link></div>
          <div>
          <div className="navbar-pelu-div">Peluqueria</div>
            <div className="navbar-pelu-div-links">
              <Link to="/peluqueria/nuestrosalon" className="navbarToPelu">- Conoce nuestro salón y más</Link> <br></br>
              <Link to="/peluqueria/nuestrosservicios" className="navbarToPelu">- Qué servicios ofrecemos</Link><br></br>
              <Link to="/peluqueria/nuestraformacion" className="navbarToPelu">- Nuestra formación</Link><br></br>
              <Link to="/peluqueria/trabajosytestimonios" className="navbarToPelu">- Nuestros trabajos y testimonios</Link><br></br>
              <Link to="/agendadogs" className="navbarToPelu">- Agenda tu turno</Link>
            </div>
          </div>
          <div>
            <div className="navbar-pelu-div">Tienda</div>
            <div className="navbar-pelu-div-links">
              <Link to="/tienda/equipamiento" className="navbarToPelu">- Equipamiento de paseo</Link> <br></br>
              <Link to="/tienda/cosmetica" className="navbarToPelu">- Cosmética natural</Link><br></br>
              <Link to="/tienda/accesorios" className="navbarToPelu">- Accesorios</Link><br></br>
              <Link to="/tienda/kitslimpieza" className="navbarToPelu">- ¡Quiero mis kits de limpieza "Lengua Afuera"</Link><br></br>
            </div>
          </div>
          <div className="navbar-pelu-div">Contacto</div>
          <div className="navbar-redes">
            <a href="https://www.instagram.com/lengua_afuera/">
              <i className="fa-brands fa-instagram iconsFooter-insta"></i>
            </a>
            <a href="https://w.app/5fgq7w" className="link-to-insta">
              <i className="fa-brands fa-whatsapp iconsFooter-wsp"></i>
            </a>
          </div>
        </div>
      </nav>
    );
  };