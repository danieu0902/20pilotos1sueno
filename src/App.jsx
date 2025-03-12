import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Pilotos from './pages/Pilotos';
import Novedades from './pages/Novedades';
import Favoritos from './pages/Favoritos';
import Login from './pages/Login';
import GraficaMundiales from './pages/GraficaMundiales'; 
import GraficaVictorias from './pages/GraficaVictorias';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Pilotos />} />
            <Route path="/novedades" element={<Novedades />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/grafica-mundiales" element={<GraficaMundiales />} />
            <Route path="/grafica-victorias" element={<GraficaVictorias />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
