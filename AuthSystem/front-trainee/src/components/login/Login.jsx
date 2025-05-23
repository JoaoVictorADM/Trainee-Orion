import { FaUser, FaLock } from 'react-icons/fa'
import { useState } from 'react'
import './Login.css'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email: ", email);
        console.log("Password: ", password);

        // Enviar os dados para o backend
    }

    return (
    <div className="container">
        <form onSubmit={handleSubmit}>
            <h1>Faça login</h1>
            <div>
                <input type="email" placeholder="E-mai" onChange={(e) => setEmail(e.target.value)}/>
                <FaUser className="icon"/>
            </div>
            <div>
                <input type="password" placeholder="Senha"onChange={(e) => setPassword(e.target.value)}/>
                <FaLock className="icon"/>
            </div>

            <div className="recall-forget">
                <label>
                    <input type="checkbox" />
                    Lembre de mim
                </label>
                <a href="#">Esqueceu a senha?</a>
            </div>

            <button>Entrar</button>

            <div className="signup-link">
                <p>Não tem uma conta?<a href="a">Registar</a></p>
            </div>
        </form>
    </div>
    )
}

export default Login
