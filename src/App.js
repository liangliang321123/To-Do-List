import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Component/MainPage';
import EditPage from './Component/EditPage';
import Eisenhower from './Component/Eisenhower';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/'
          element={<MainPage />} />
        <Route path='/EDIT/:ID'
          element={<EditPage />} />
        <Route path='/ESHG/'
          element={<Eisenhower />} />
      </Routes>
    </Router>

  );
}

export default App;
