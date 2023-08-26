import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './router/NavigationBar.component';
import Home from './router/Home.component';
import Settings from './router/Settings.component';
import Login from './router/Login.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='settings' element={<Settings />} />
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
