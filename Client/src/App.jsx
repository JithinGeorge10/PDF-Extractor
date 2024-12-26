import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import ExtractPdf from './Pages/ExtractPdf'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/extractPdf' element={<ExtractPdf />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;