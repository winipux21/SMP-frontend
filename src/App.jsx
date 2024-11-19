import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar'; // Добавьте этот импорт
import HomePage from './pages/HomePage';
import LogList from './components/LogList/LogList';
import MapPlaceholder from './components/Map/MapPlaceholder';
import './globalStyles.css'; // Импорт глобальных стилей
import HelpSection from './components/HelpSection/HelpSection';
import FormSection from './components/FormSection/FormSection';
import UsefulResources from './components/UsefulResources/UsefulResources';
import TeamSection from './components/TeamSection/TeamSection';
import SiteFooter from './components/SiteFooter/SiteFooter';
import ModeratorPage from './pages/ModeratorPage'; // Импорт страницы модератора
import GodPage from './pages/GodPage'; // Импорт страницы бога
import SelectionSection from './components/SelectionSection/SelectionSection';
function App() {
  return (
    <Router>
      <Routes>
        {/* Главная часть с Navbar */}
        <Route path="/" element={
          <>
            <Navbar />
            <SelectionSection />
            <LogList />
            <div id='map'></div>
            <MapPlaceholder />
            <div style={{ height: '20px', backgroundColor: '#A5C882' }}></div>

            <HelpSection />
            <FormSection />
            <UsefulResources />
            <TeamSection />
            <SiteFooter />
          </>
        } />
        {/* Отдельные страницы для модератора и бога */}
        <Route path="/moderator" element={<ModeratorPage />} />
        <Route path="/god" element={<GodPage />} />
      </Routes>
    </Router>
  );
}

export default App;
