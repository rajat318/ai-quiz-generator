import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Generator } from './pages/Generator';
import { QuizPlayer } from './pages/QuizPlayer';
import { Results } from './pages/Results';
import { Dashboard } from './pages/Dashboard';
import { Assistant } from './pages/Assistant';
import { About } from './pages/About';

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generator />} />
          <Route path="/quiz/:quizId" element={<QuizPlayer />} />
          <Route path="/results/:quizId" element={<Results />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}
