import { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import ChosenMonth from './modules/Calendar/ChosenMonth';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date();
    const date = currentDate.toISOString().slice(0, 7);
    navigate(`/${date}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<ChosenMonth />} />
        <Route path="/:currentMonth" element={<ChosenMonth />} />
      </Routes>
    </>
  );
}

function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default MainApp;
