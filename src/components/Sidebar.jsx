import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";

// Contenedor del Sidebar
const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: #1c1c1c;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  transition: transform 0.3s ease-in-out;
  
  @media (max-width: 768px) {
    transform: ${(props) => (props.open ? "translateX(0)" : "translateX(-100%)")};
  }
`;

// Botón de hamburguesa (solo en móvil)
const ToggleButton = styled.button`
  display: none;
  position: fixed;
  top: 20px;
  left: 10px;
  background: #1c1c1c;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1000;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Logo = styled.img`
  width: 100%;
  height: 100px;
  background: white;
  margin-bottom: 20px;
`;

const MenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px;
  margin: 5px 0;
  display: block;
  text-align: left;
  font-size: 16px;
  border: none;
  background: none;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: #333;
  }
`;

// Botón de Cerrar Sesión (Mismo estilo que los otros)
const LogoutButton = styled.button`
  color: white;
  text-decoration: none;
  padding: 10px;
  margin: 5px 0;
  display: block;
  text-align: left;
  font-size: 16px;
  border: none;
  background: none;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: #333;
  }
`;

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    alert("Sesión cerrada correctamente");
  };

  return (
    <>
      {/* Botón de hamburguesa SOLO en móviles */}
      <ToggleButton onClick={() => setOpen(!open)}>☰</ToggleButton>

      {/* Sidebar */}
      <SidebarContainer open={open}>
        <Logo src="https://res.cloudinary.com/danieu0902/image/upload/v1741486577/logo%20react.webp" alt="Logo" />
        <h2>20 Pilotos 1 Sueño</h2>
        <MenuItem to="/" onClick={() => setOpen(false)}>🏎️ Pilotos</MenuItem>
        <MenuItem to="/novedades" onClick={() => setOpen(false)}>🔥 Novedades</MenuItem>
        <MenuItem to="/favoritos" onClick={() => setOpen(false)}>⭐ Pilotos Favoritos</MenuItem>
        {/* Nuevo enlace para la gráfica */}
        <MenuItem to="/grafica-mundiales" onClick={() => setOpen(false)}>📊 Gráfica: Pilotos con más mundiales</MenuItem>
        <MenuItem to="/grafica-victorias" onClick={() => setOpen(false)}>🏆 Gráfica: Número de victorias pilotos</MenuItem>

        {user ? (
          <LogoutButton onClick={handleLogout}>🚪 Cerrar Sesión</LogoutButton>
        ) : (
          <MenuItem to="/login" onClick={() => setOpen(false)}>🔑 Iniciar Sesión</MenuItem>
        )}
      </SidebarContainer>
    </>
  );
};

export default Sidebar;