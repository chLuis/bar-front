import { Link } from "react-router-dom"
import './btnHome.css'

export const BtnHome = () => {
    return (
        <Link to="/">
            <button className="btn-backhome">🔙</button>
        </Link>
    )
}