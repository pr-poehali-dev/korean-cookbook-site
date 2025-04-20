
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import RecipeDetail from './pages/RecipeDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
