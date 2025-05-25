import { useLocation } from "react-router-dom";
import styles from './Home.module.css'; 

const Home = () => {
    const location = useLocation();
    const user = location.state?.user || "Usuário";

    return (
    <div>
        <h1 className={styles.h1}>Bem-vindo(a), {user}!</h1>
    </div>
    );
}

export default Home
