import { useState, useEffect } from "react";
import "./btnTop.css";

export const BtnTop = () => {
    
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Obtén la posición actual de scroll
            const scrollY =
                window.scrollY || document.documentElement.scrollTop;

            // Define un umbral, por ejemplo, 100 pixels desde la parte superior, ajusta según sea necesario
            const scrollThreshold = 100;

            // Actualiza la visibilidad del componente según la posición de scroll
            setIsVisible(scrollY > scrollThreshold);
        };

        // Agrega el evento de scroll al montar el componente
        window.addEventListener("scroll", handleScroll);

        // Elimina el evento de scroll al desmontar el componente para evitar pérdidas de rendimiento
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // El segundo argumento [] garantiza que el efecto se ejecute solo una vez al montar el componente

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Hace que el scroll sea suave
        });
    }

    return (
        <>
            {isVisible && (
                <div className="btnToTop" onClick={scrollToTop}>
                    <i className="fa-solid fa-arrow-up flechaTop"></i>
                </div>
            )}
        </>
    );
};
