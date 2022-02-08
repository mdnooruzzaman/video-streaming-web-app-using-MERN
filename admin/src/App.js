
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {useState , useContext} from 'react'
import Sidevar from './components/sidebar/Sidevar';
import Topvar from './components/topvar/Topvar';
import Home from './Pages/home/Home';
import {BrowserRouter as Router  , Route , Routes , useNavigate } from 'react-router-dom'
import UserList from './Pages/userlist/UserList';
import User from './Pages/user/User';
import NewUser from './Pages/newUser/NewUser';
import ProductList from './Pages/productList/ProductList';
import Product from './Pages/product/Product';
import NewProduct from './Pages/newProduct/NewProduct';
import CreateNewList from './Pages/createNewList/CreateNewList';
import Login from './Pages/login/login';
import { AuthContext } from './context/authContext/AuthContext';
import NewList from './Pages/newList/NewList';
//import { AuthContext } from './context/authContext/AuthContext';
import { logout } from './context/authContext/AuthAction';
import { GrNavigate } from 'react-icons/gr';

function App() {
  const {user} = useContext(AuthContext);
 const [admin , setAdmin] = useState(false);
 const {isFetching, dispatch} = useContext(AuthContext)
 // const navigate = useNavigate()
  console.log(isFetching)
 const handleLogout = () => {
  dispatch(logout());
  setAdmin(false);
  // navigate("/login")
  
}
  
    
  return (
    <Router>
    <div className="App">
      { !admin ? (

      <Routes>
       <Route  path='/login' element={user ? (<Home/> && setAdmin(true)) :<Login/>}/>

      </Routes>
      ) : (
        <>
        
      <Topvar logout={handleLogout}
       />
     <div className='container'>
       <Sidevar />
       <Routes>
         <Route exact path='/' element={<Home/>}/>
          <Route path='/users' element={<UserList/>}/>
          <Route path='/user/:userId' element={<User/>}/>
          <Route path='/newUser' element={<NewUser/>}/>
          <Route path ='/movies' element={<ProductList/>} />
          <Route path='/lists' element={<NewList/>}/>
          <Route path ='/product/:productId' element={<Product/>} />
          <Route path ='/newProduct' element={<NewProduct/>} />
          <Route path ='/newList' element={<CreateNewList/>} />

      </Routes>
     </div>
        </>
      )

      }


    </div>
    </Router>
  );
}

export default App;
