
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from './components/Navbar';

function App() {
  return (
    <div >
    <Router>
    
      <Routes>
        <Route path='/' element={<Navbar />} />  
        
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
