import "./peluqueria.css";
import { BtnHome, Navbar } from "../../components";
//import { peluqueriaMain } from "../../assets/images/peluqueriaMain.jpeg"

export const PeluqueriaPage = () => {


    function showMore(i) {
        const paragraph = document.querySelectorAll('p')
        for(let j = 0; j < paragraph.length; j++) {
            if(j !== i) {
                paragraph[j]?.classList.remove('p-show')
                paragraph[j]?.classList.add('p-hidden')
            }
        }
        paragraph[i]?.classList.add('p-show')
        paragraph[i]?.classList.remove('p-hidden')
    }
    
    return (
        <>
        <Navbar route={"Peluqueria"}/>
            <div className="container-peluqueria">
                <section>
                    <div className="peluqueriaPicture">
                        <h2>Bienvenidos</h2>
                    </div>
                    <h5>Hola!</h5>
                    <h6>
                        Primero que todo gracias por llegar hasta aquí, mi
                        objetivo es este apartado es darte facilidad para que
                        entiendas cómo funciona lengua afuera. Y obvio despejar
                        dudas para dar el paso de confiarnos tu compañero de
                        cuatro patas 🐶😊
                    </h6>
                </section>
                <section>
                    <ul>
                        <li onClick={() => showMore(0)}>¿Que es lengua afuera?</li>
                        {<p className="p-hidden">
                            0Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Vitae natus mollitia quisquam sint eveniet
                            quod in perspiciatis obcaecati error minima illo
                            maiores, iure quidem distinctio, at cumque delectus
                            a eligendi?
                        </p>}
                        <li onClick={() => showMore(1)}>¿Quien soy? </li>
                        {<p className="p-hidden">
                            1Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Vitae natus mollitia quisquam sint eveniet
                            quod in perspiciatis obcaecati error minima illo
                            maiores, iure quidem distinctio, at cumque delectus
                            a eligendi?
                        </p>}
                        <li onClick={() => showMore(2)}>¿Queres conocer nuestro salón? </li>
                        {<p className="p-hidden">
                            2Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Vitae natus mollitia quisquam sint eveniet
                            quod in perspiciatis obcaecati error minima illo
                            maiores, iure quidem distinctio, at cumque delectus
                            a eligendi?
                        </p>}
                        <li onClick={() => showMore(3)}>¿Cuáles son las pautas de trabajo? </li>
                        {<p className="p-hidden">
                            3Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Vitae natus mollitia quisquam sint eveniet
                            quod in perspiciatis obcaecati error minima illo
                            maiores, iure quidem distinctio, at cumque delectus
                            a eligendi?
                        </p>}
                        <li onClick={() => showMore(4)}>¿Que son los packs de servicio? </li>
                        {<p className="p-hidden">
                            4Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Vitae natus mollitia quisquam sint eveniet
                            quod in perspiciatis obcaecati error minima illo
                            maiores, iure quidem distinctio, at cumque delectus
                            a eligendi?
                        </p>}
                        <li onClick={() => showMore(5)}>¿Donde queda la pelu? </li>
                        {<p className="p-hidden">
                        <div className="mapouter">
      <div className="gmap_canvas">
        <iframe
          title="Map"
          width="100%"
          height="240"
          src="https://maps.google.com/maps?q=San+Lorenzo+1060&t=&z=16&ie=UTF8&iwloc=&output=embed"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        ></iframe>
      </div>
    </div>
                        </p>}
                        <li onClick={() => showMore(6)}>Contacto.</li>
                        {<p className="p-hidden">
                            4Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Vitae natus mollitia quisquam sint eveniet
                            quod in perspiciatis obcaecati error minima illo
                            maiores, iure quidem distinctio, at cumque delectus
                            a eligendi?
                        </p>}
                    </ul>
                </section>
                <section className="sectionPeluPie">
                    <h6>Hasta aquí tenes toda la información para sumar a tu cachorro pequeño o gigante al team Lengua Afuera. Espero haberte sacado las dudas y animarte a contratarnos!.</h6>
                    <h5>Gracias 🐶</h5>
                    <h4>Gabriela</h4>
                </section>
            </div>
            <BtnHome />
        </>
    );
};
