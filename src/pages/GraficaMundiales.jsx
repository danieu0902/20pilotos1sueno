import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registra los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  flex-grow: 1;
  padding: 20px;
  margin-left: 250px; /* Ajusta según el ancho del sidebar */
`;

const GraficaMundiales = () => {
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
        label: 'Campeonatos ganados',
        data: pilotos.map(p => p.campeonatos || 0), // Usamos 'campeonatos' en lugar de 'campeonato'
        borderColor: '#007bff', // Color de la línea
        backgroundColor: 'rgba(0, 123, 255, 0.1)', // Color de fondo
        borderWidth: 2, // Grosor de la línea
        fill: false, // No rellenar el área debajo de la línea
        tension: 0.4, // Suaviza la línea
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
        text: 'Pilotos con más campeonatos',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de campeonatos',
        },
        ticks: {
          stepSize: 1, // Esto establece el paso de las unidades en el eje Y
        },
      },
      x: {
        title: {
          display: true,
          text: 'Pilotos',
        },
      },
    },
  };

  return (
    <Container>
      <h1>📊 Gráfica: Pilotos con más mundiales</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Line data={data} options={options} />
      </div>
    </Container>
  );
};

export default GraficaMundiales;