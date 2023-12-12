import "./peluqueria.css";
import { LogoLengua } from "../../components";
//import { peluqueriaMain } from "../../assets/images/peluqueriaMain.jpeg"

export const PeluqueriaPage = () => {
    return (
        <>
            <LogoLengua />
            <div className="container-peluqueria">
                <section>
                    <div className="peluqueriaPicture">
                        <h2>Bienvenidos</h2>
                    </div>
                    <p>
                        Hola! Primero que todo gracias por llegar hasta aquí, mi
                        objetivo es este apartado es darte facilidad para que
                        entiendas cómo funciona lengua afuera. Y obvio despejar
                        dudas para dar el paso de confiarnos tu compañero de
                        cuatro patas 🐶😊
                    </p>
                </section>
                
            </div>
        </>
    );
};
