import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import Profile from './components/Profile';
import Manage from './components/Manage';
import Search from './components/Search';
import './App.css';
import rtlPlugin from "stylis-plugin-rtl";

function App() {
  const theme = createTheme({
    direction: 'rtl',
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<Search />} />
            <Route path="/profile/:personId" element={<Profile />} />
            <Route path="search" element={<Search />} />
            <Route path="manage" element={<Manage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
