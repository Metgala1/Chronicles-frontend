import Navbar from "./navbar/Navbar";
import styles from "../styles/Dashboard.module.css"
const Dashboard = () => {

    return (
        <div className={styles.dashboard}>
            <div className={styles.headerDiv}>
                 <Navbar />
            </div>
            <div className={styles.mainDiv}></div>
            <div className={styles.footerDiv}></div>
        </div>
    )
}

export default Dashboard