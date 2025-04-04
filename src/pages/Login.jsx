import { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// --- Estilos con Styled Components ---
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const FormContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 16px;
  
  &:hover {
    background-color: darkred;
  }
`;

const LinkText = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: #555;
`;

const Login = () => {
  // Estados separados para cada formulario
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      alert("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      alert("Cuenta creada con éxito");
      navigate("/");
    } catch (error) {
      alert("Error al registrarse");
    }
  };

  return (
    <Container>
      <FormContainer>
        {/* --- FORMULARIO DE LOGIN --- */}
        <Title>Iniciar Sesión</Title>
        <form onSubmit={handleLogin}>
          <Input 
            type="email" 
            placeholder="Email" 
            value={loginEmail} 
            onChange={(e) => setLoginEmail(e.target.value)} 
          />
          <Input 
            type="password" 
            placeholder="Contraseña" 
            value={loginPassword} 
            onChange={(e) => setLoginPassword(e.target.value)} 
          />
          <Button type="submit">Entrar</Button>
        </form>

        <LinkText>¿No tienes cuenta?</LinkText>

        {/* --- FORMULARIO DE REGISTRO --- */}
        <form onSubmit={handleRegister}>
          <Input 
            type="email" 
            placeholder="Email" 
            value={registerEmail} 
            onChange={(e) => setRegisterEmail(e.target.value)} 
          />
          <Input 
            type="password" 
            placeholder="Contraseña" 
            value={registerPassword} 
            onChange={(e) => setRegisterPassword(e.target.value)} 
          />
          <Button type="submit">Registrarse</Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Login;
