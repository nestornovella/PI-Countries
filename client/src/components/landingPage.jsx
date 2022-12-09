import { Link } from "react-router-dom"
import Styles from "../Styles.module.css"
export function Landing() {
    return (
        
        <div className={Styles.landing}>
            <h1>PAGINA DE INICIO A OTRA COMO MUCHAS TANTAS APP DE PAISES!</h1>
            <Link to={"/country"}><button>ENTER</button></Link>
        </div>
        
    )

}