import "./peluqueria.css";
import { BtnHome } from "../../components";
//import { peluqueriaMain } from "../../assets/images/peluqueriaMain.jpeg"

export const PeluqueriaPage = () => {
    return (
        <>
            <div className="container-peluqueria">
                <section>
                    <div className="peluqueriaPicture">
                        <h2>Bienvenidos</h2>
                    </div>
                    <h5>Hola!</h5>
                    <p>
                        Primero que todo gracias por llegar hasta aquí, mi
                        objetivo es este apartado es darte facilidad para que
                        entiendas cómo funciona lengua afuera. Y obvio despejar
                        dudas para dar el paso de confiarnos tu compañero de
                        cuatro patas 🐶😊
                    </p>
                </section>
                <section>
                <ul>
                    <li>¿Que es lengua afuera?</li>
                    <li>¿Quien soy? </li>
                    <li>¿Queres conocer nuestro salón? </li>
                    <li>¿Cuáles son las pautas de trabajo? </li>
                    <li>¿Que son los packs de servicio? </li>
                    <li>¿Donde queda la pelu? </li>
                    <li>Contacto.</li>
                    </ul>
                </section>
            </div>
            <BtnHome />
        </>
    );
};
