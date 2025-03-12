import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  flex-grow: 1;
  padding: 20px;
  margin-left: 250px; /* Ajusta según el ancho del sidebar */
`;

const PilotosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
`;

const PilotoCard = styled.div`
  background: #f1f1f1;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const PilotoImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 5px;
`;

const RemoveButton = styled.button`
  background: darkgray;
  color: white;
  border: none;
  padding: 8px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: gray;
  }
`;

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const savedFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(savedFavoritos);
  }, []);

  const removeFromFavorites = (id) => {
    const nuevosFavoritos = favoritos.filter(p => p.id !== id);
    setFavoritos(nuevosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  };

  return (
    <Container>
      <h1>⭐ Pilotos Favoritos</h1>
      {favoritos.length === 0 ? (
        <p>No hay pilotos en favoritos</p>
      ) : (
        <PilotosGrid>
          {favoritos.map((p) => (
            <PilotoCard key={p.id}>
              <PilotoImage 
                src={p.imagen || "https://via.placeholder.com/150"} 
                alt={p.nombre_completo} 
              />
              <h3>{p.nombre_completo}</h3>
              <p><strong>Equipo:</strong> {p.equipo_actual}</p>
              <p><strong>Monoplaza #:</strong> {p.numero_monoplaza}</p>
              <p><strong>Nacionalidad:</strong> {p.nacionalidad}</p>
              <p><strong>Edad:</strong> {p.edad} años</p>
              <p><strong>Campeonatos Ganados:</strong> {p.campeonatos}</p>
              <RemoveButton onClick={() => removeFromFavorites(p.id)}>
                ❌ Quitar de Favoritos
              </RemoveButton>
            </PilotoCard>
          ))}
        </PilotosGrid>
      )}
    </Container>
  );
};

export default Favoritos;
