import Stroll from './Stroll';
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";


function App() {
  return (
    <HashRouter>
      <Routes>
        {/* makes it the default navigation point */}
        <Route path="/" element={<Navigate to="Stroll" />} />
        <Route path="/Stroll/*" element={<Stroll />} />
      </Routes>
    </HashRouter>
  )
}

export default App;
