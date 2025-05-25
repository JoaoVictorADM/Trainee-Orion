import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import './Auth.css' 

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if(password !== confirmPassword){
            setError("As senhas não coincidem.");
            return;
        }

        const userData = {
            name: name,
            email: email,
            password: password
        };

        try{
            const response = await fetch('http://localhost:8080/api/auth/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if(response.ok){
                const data = await response.json();
                console.log('Usuário registrado com sucesso:', data);
                navigate("/home", { state: { user: data.name } });
            } else{
                const errorData = await response.text();
                console.error('Falha no registro:', response.status, errorData);

                try {
                    const parsedError = JSON.parse(errorData);
                    setError(parsedError.message || `Erro ${response.status}: ${errorData}`);
                } catch (parseError) {
                    setError(`Erro ${response.status}: ${errorData}`);
                }
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            setError("Erro ao conectar com o servidor. Tente novamente mais tarde."); 
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Se cadastre</h1>

                <div className="input-field">
                    <input type="text" placeholder="Nome" required onChange={(e) => setName(e.target.value)} value={name} />
                    <FaUser className="icon" />
                </div>
                <div className="input-field">
                    <input type="email" placeholder="E-mail" required onChange={(e) => setEmail(e.target.value)} value={email} />
                    <FaEnvelope className="icon" />
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
                    <FaLock className="icon" />
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
                    <FaLock className="icon" />
                </div>

                {error && <p className="error-message">{error}</p>} 

                <div className="recall-forget">
                    <label>
                        <input type="checkbox" />
                        Lembre de mim
                    </label>
                    <a href="#">Esqueceu a senha?</a>
                </div>

                <button type="submit">Entrar</button> 

                <div className="signup-link">
                    <p>Já tem uma conta? <Link to="/login">Logar</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Register