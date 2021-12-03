import { useState,useEffect } from 'react';
import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import { AuthContext } from './context';

const App = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem('auth')){
      setIsAuth(true);
    }
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>

  );
};

export default App;
