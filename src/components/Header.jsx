import {FaFeatherAlt} from "react-icons/fa"
import styles from "../styles/Header.module.css"
const Header = () => {
    return (
        <>
      <header className={styles.chroniclesHeader}>
      <h1 className={styles.chroniclesTitle}><FaFeatherAlt />Chronicles</h1>
      <p className={styles.chroniclesSubtitle}>
        Dive into stories, thoughts, and ideas from around the world
      </p>
    </header>
        </>
    )
}

export default Header;