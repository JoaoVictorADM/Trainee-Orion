import { FaEnvelope , FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import './Auth.css'

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const loginData = {
            email: email,
            password: password
        };

        try{
            const response = await fetch('http://localhost:8080/api/auth/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if(response.ok){
                const data = await response.json();
                console.log('Login bem-sucedido:', data);
                navigate("/home", { state: { user: data.name } });
            } else{
                const errorData = await response.text();
                console.error('Falha no login:', response.status, errorData);

                try {
                    const parsedError = JSON.parse(errorData);
                    setError(parsedError.message || `Erro ${response.status}: ${errorData}`);
                } catch (parseError) {
                    setError(`Erro ${response.status}: ${errorData}`);
                }
            }
        } catch(error) {
            console.error('Erro ao conectar com o servidor:', error);
            setError("Erro ao conectar com o servidor. Tente novamente mais tarde."); 
        }
    };

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

                {error && <p className="error-message">{error}</p>} 

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
