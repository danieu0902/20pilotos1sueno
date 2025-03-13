import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { auth } from '../firebaseConfig'; // Importamos Firebase Auth
import { onAuthStateChanged } from 'firebase/auth';

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  margin-left: 250px; /* Ajusta según el ancho del sidebar */
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const PilotosContainer = styled.div`
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
  transition: transform 0.2s ease-in-out; /* Agregamos transición */

  &:hover {
    transform: scale(1.05); /* Aumentamos el tamaño en un 5% */
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.2); /* Mejoramos la sombra */
  }
`;

const PilotoImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 5px;
`;

const FavoritoButton = styled.button`
  background: ${({ disabled }) => (disabled ? '#ccc' : 'red')};
  color: white;
  border: none;
  padding: 10px;
  margin-top: 10px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border-radius: 5px;
  width: 100%;

  &:hover {
    background: ${({ disabled }) => (disabled ? '#ccc' : 'darkred')};
  }
`;

const Pilotos = () => {
  const [pilotos, setPilotos] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null); // Estado del usuario autenticado

  useEffect(() => {
    axios.get('https://nxapi-20-pilotos-1-sueno.vercel.app/api/drivers')
      .then(response => setPilotos(response.data))
      .catch(error => console.error(error));

    // Verificar si el usuario ha iniciado sesión
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const filteredPilotos = pilotos.filter(p =>
    p.nombre_completo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <MainContent>
        <h1>Lista de Pilotos</h1>
        <SearchInput
          type="text"
          placeholder="Buscar piloto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <PilotosContainer>
          {filteredPilotos.length > 0 ? (
            filteredPilotos.map(piloto => (
              <PilotoCard key={piloto.id}>
                <PilotoImage 
                  src={piloto.imagen} 
                  alt={piloto.nombre_completo} 
                />
                <h3>{piloto.nombre_completo}</h3>
                <p><strong>Equipo:</strong> {piloto.equipo_actual}</p>
                <p><strong>Monoplaza #:</strong> {piloto.numero_monoplaza}</p>
                <p><strong>Nacionalidad:</strong> {piloto.nacionalidad}</p>
                <p><strong>Edad:</strong> {piloto.edad} años</p>
                <p><strong>Campeonatos Ganados:</strong> {piloto.campeonatos}</p>

                <FavoritoButton 
                  onClick={() => addToFavorites(piloto)}
                  disabled={!user} // Si no hay usuario, deshabilitamos el botón
                >
                  ⭐ Agregar a Favoritos
                </FavoritoButton>
              </PilotoCard>
            ))
          ) : (
            <p>No se encontraron pilotos</p>
          )}
        </PilotosContainer>
      </MainContent>
    </Container>
  );
};

// Función para agregar pilotos a favoritos
const addToFavorites = (piloto) => {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  if (!favoritos.some(p => p.id === piloto.id)) {
    favoritos.push(piloto);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    alert('Piloto agregado a favoritos');
  } else {
    alert('Este piloto ya está en favoritos');
  }
};

export default Pilotos;