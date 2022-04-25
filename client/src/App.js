import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Profile from './components/Profile';
import Manage from './components/Manage';
import Search from './components/Search';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="search" element={<Search />} />
          <Route path="manage" element={<Manage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
