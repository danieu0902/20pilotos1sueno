import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  flex-grow: 1;
  padding: 20px;
  margin-left: 250px; /* Ajusta según el ancho del sidebar */
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const PilotosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
`;

// PilotoCard con colores suavizados
const PilotoCard = styled.div`
  background: ${({ position }) => 
    position === 1 ? 'linear-gradient(135deg, #f4c430, #ffd700)' : 
    position === 2 ? 'linear-gradient(135deg, #e0e0e0, #c0c0c0)' : 
    position === 3 ? 'linear-gradient(135deg, #b87333, #cd7f32)' : '#f1f1f1'};
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  color: ${({ position }) => (position ? '#000' : '#333')}; /* Texto oscuro para mejor contraste */
`;

const PilotoImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 5px;
`;

const Novedades = () => {
  const [pilotos, setPilotos] = useState([]);

  useEffect(() => {
    axios.get('https://nxapi-20-pilotos-1-sueno.vercel.app/api/drivers')
      .then(response => setPilotos(response.data))
      .catch(error => console.error(error));
  }, []);

  // Función para obtener 3 pilotos aleatorios
  const getRandomPilotos = () => {
    return [...pilotos].sort(() => Math.random() - 0.5).slice(0, 3);
  };

  return (
    <Container>
      <h1>🔥 Novedades</h1>
      
      {/* Sección del podio */}
      <Section>
        <h2>🏆 Podio del GP de Bahrain</h2>
        <PilotosGrid>
          {getRandomPilotos().map((p, index) => (
            <PilotoCard key={p.id} position={index + 1}>
              <PilotoImage 
                src={p.imagen || "https://via.placeholder.com/150"} 
                alt={p.nombre_completo} 
              />
              <h3>{p.nombre_completo}</h3>
              <p><strong>Equipo:</strong> {p.equipo_actual}</p>
              <p><strong>Monoplaza #:</strong> {p.numero_monoplaza}</p>
            </PilotoCard>
          ))}
        </PilotosGrid>
      </Section>

      {/* Sección de pilotos con más puntos */}
      <Section>
        <h2>🏅 Pilotos con más puntos 24-25</h2>
        <PilotosGrid>
          {getRandomPilotos().map((p, index) => (
            <PilotoCard key={p.id} position={index + 1}>
              <PilotoImage 
                src={p.imagen || "https://via.placeholder.com/150"} 
                alt={p.nombre_completo} 
              />
              <h3>{p.nombre_completo}</h3>
              <p><strong>Equipo:</strong> {p.equipo_actual}</p>
              <p><strong>Monoplaza #:</strong> {p.numero_monoplaza}</p>
            </PilotoCard>
          ))}
        </PilotosGrid>
      </Section>

      {/* Sección de pilotos más queridos en España */}
      <Section>
        <h2>❤️ Pilotos más queridos en España</h2>
        <PilotosGrid>
          {getRandomPilotos().map((p, index) => (
            <PilotoCard key={p.id} position={index + 1}>
              <PilotoImage 
                src={p.imagen} 
                alt={p.nombre_completo} 
              />
              <h3>{p.nombre_completo}</h3>
              <p><strong>Equipo:</strong> {p.equipo_actual}</p>
              <p><strong>Monoplaza #:</strong> {p.numero_monoplaza}</p>
            </PilotoCard>
          ))}
        </PilotosGrid>
      </Section>
    </Container>
  );
};

export default Novedades;