
import './App.scss';
import {BrowserRouter as Router , Routes , Route , Navigate } from 'react-router-dom'
import Home from './Pages/home/Home'
import Watch from './Pages/watch/Watch'
import Register from './Pages/register/Register'
import Login from './Pages/login/Login'
import { useContext } from 'react';
import {AuthContext} from './authContext/AuthContext'
import User from './Pages/setting/Setting';
function App() {
  const {user} = useContext(AuthContext);


 // const user = true;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route  path="/" element={  user ? <Home/> : <Navigate to="/register"/>}/>
          <Route path="/register" element={  !user ? <Register/> : <Navigate to="/"/>}/>
          <Route path="/login" element={ !user ? <Login/> : <Navigate to="/"/>}/>
          { user &&
           (
          <>
          <Route exact path="/movies" element={ <Home type="movie"/>}/>
          <Route path="/series" element={ <Home type="series"/>}/>

          <Route path="/watch/:watchId" element={ <Watch/>}/>
          <Route path="/user/:userId" element={<User/>}/>
          </>
          )}

          
        </Routes>

      </Router>
    </div>
  );
}

export default App;
