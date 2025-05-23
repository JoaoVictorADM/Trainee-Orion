import { FaEnvelope , FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email: ", email);
        console.log("Password: ", password);

        // Enviar os dados para o backend
    }

    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Faça login</h1>
                <div className="input-field">
                    <input type="email" placeholder="E-mail" required onChange={(e) => setEmail(e.target.value)}/>
                    <FaEnvelope className="icon"/>
                </div>
                <div className="input-field">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Senha"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <span onClick={() => setShowPassword(!showPassword)} className="password-toggle-icon">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
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
                    <p>Não tem uma conta? <Link to="/register">Registrar</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Login
