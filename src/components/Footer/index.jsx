import "./footer.css";
import Swal from "sweetalert2";



export const Footer = () => {

    const Toast = Swal.mixin({
        toast: true,
        position: "bottom",
        showConfirmButton: true,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });


    function goToInstagram() {
        Toast.fire({
            text: "¡Te invitamos a seguirnos en Instagram!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, ir a Instagram",
            cancelButtonText: "Más tarde",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "https://www.instagram.com/lengua_afuera/";
            }
        });
    }

    function goToWsp() {
        Toast.fire({
            text: "¡Te invitamos a seguirnos en WhatsApp!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, ir a WhatsApp",
            cancelButtonText: "Más tarde",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "https://w.app/5fgq7w";
            }
        });
    }


    return (
        <footer>
        <div className="links-redes">
            <div className="link-to-insta" onClick={goToInstagram}>
                <i className="fa-brands fa-instagram iconsFooter-insta"></i>
            </div>
            <div className="link-to-insta" onClick={goToWsp}>
                <i className="fa-brands fa-whatsapp iconsFooter-wsp"></i>
            </div>
            </div>
            <p>© 2023 Lengua Afuera</p>
        </footer>
    );
};
