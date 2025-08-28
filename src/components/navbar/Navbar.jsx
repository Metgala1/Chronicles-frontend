import styles from "./Navbar.module.css"
import { Link } from "react-router-dom"
const navbar = () => {
    return (
        <div className={styles.navbar}>
            <p className={styles.navbarLogo}>Chronicles</p>
            <nav>
                <ul>
                    <Link className={styles.link}><li key={"home"}>Home</li></Link>
                    <Link className={styles.link}><li key={"posts"}>Posts</li></Link>
                    <Link className={styles.link}><li key={"profile"}>Profile</li></Link>
                    <Link className={styles.link}><li key={"abou"}>About</li></Link>
                </ul>
            </nav>
        </div>
    )
}

export default navbar