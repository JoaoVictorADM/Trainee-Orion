import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Name: ", name);
        console.log("Email: ", email);
        console.log("Password: ", password);
        console.log("Confirm Password: ", confirmPassword);
    }

    return (
    <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Se cadastre</h1>
                <div className="input-field">
                    <input type="text" placeholder="Nome" required onChange={(e) => setName(e.target.value)}/>
                    <FaUser className="icon"/>
                </div>
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
                <div className="input-field">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirme a Senha"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                    />
                    <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="password-toggle-icon">
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
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
                    <p>Já tem uma conta? <Link to="/login">Logar</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Register
