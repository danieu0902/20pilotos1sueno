import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registra los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  flex-grow: 1;
  padding: 20px;
  margin-left: 250px; /* Ajusta según el ancho del sidebar */
`;

const GraficaVictorias = () => {
  const [pilotos, setPilotos] = useState([]);

  useEffect(() => {
    axios.get('https://nxapi-20-pilotos-1-sueno.vercel.app/api/drivers')
      .then(response => setPilotos(response.data))
      .catch(error => console.error(error));
  }, []);

  // Verificar que los datos estén disponibles antes de renderizar el gráfico
  if (!pilotos.length) {
    return <Container>Cargando...</Container>;
  }

  // Preparar datos para el gráfico
  const data = {
    labels: pilotos.map(p => p.nombre_completo), // Nombres de los pilotos
    datasets: [
      {
        label: 'Victorias',
        data: pilotos.map(p => p.victorias || 0), // Usamos 'victorias' en lugar de 'campeonatos'
        backgroundColor: '#007bff', // Color de las barras
        borderColor: '#0056b3', // Color del borde de las barras
        borderWidth: 1, // Grosor del borde
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Número de victorias de los pilotos',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de victorias',
        },
        ticks: {
          stepSize: 20, // Esto establece el paso de las unidades en el eje Y
        },
      },
      x: {
        title: {
          display: true,
          text: 'Pilotos',
        },
      },
    },
    animations: {
      // Desactivar las animaciones
      duration: 0, // No hay animación
    },
  };

  return (
    <Container>
      <h1>📊 Gráfica: Número de victorias de los pilotos</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Bar data={data} options={options} />
      </div>
    </Container>
  );
};

export default GraficaVictorias;
