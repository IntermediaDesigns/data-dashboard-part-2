import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import About from './components/About';
import CharacterDetails from './components/CharacterDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/character/:id" element={<CharacterDetails />} /> {/* New route */}
      </Routes>
    </Router>
  );
}

export default App;