import { Link } from "react-router-dom"
import './btnHome.css'


export const BtnHome = () => {
    return (
        <Link to="/">
            <i className="fa-solid fa-rotate-left volver"></i>
        </Link>
    )
}