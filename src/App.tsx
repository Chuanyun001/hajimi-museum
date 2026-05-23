import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EasterEgg from './components/EasterEgg';
import Home from './pages/Home';
import CoreCode from './pages/CoreCode';
import YuantouMaodieCode from './pages/YuantouMaodieCode';
import ConflictLab from './pages/ConflictLab';
import Diagnostic from './pages/Diagnostic';
import Chronicle from './pages/Chronicle';
import About from './pages/About';
import CodeDebugger from './pages/CodeDebugger';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono">
        <Navbar />
        <EasterEgg />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/core-code" element={<CoreCode />} />
          <Route path="/yuantoumaodie-code" element={<YuantouMaodieCode />} />
          <Route path="/conflict-lab" element={<ConflictLab />} />
          <Route path="/diagnostic" element={<Diagnostic />} />
          <Route path="/chronicle" element={<Chronicle />} />
          <Route path="/about" element={<About />} />
          <Route path="/code-debugger" element={<CodeDebugger />} />
        </Routes>
      </div>
    </Router>
  );
}