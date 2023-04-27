import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import AddProductForm from './components/product/AddProductForm';
import UpdateProductForm from './components/product/UpdateProductForm';
import ProductDetail from './components/product/ProductDetail';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Footer from './components/layout/Footer';
import { useEffect,useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Cart from "./components/cart/Cart"


import OrdersPage from './pages/OrdersPage';
import { useAuth } from './hooks/useAuth';
import UpdateMyInformation from './pages/UpdateMyInformation';
import UploadPage from './pages/UploadPage';

function App() {
  const { user, isAuthenticated } = useAuth()
  const [log,setLog]=useState(false)

  useEffect(() => {
  
const userAdmin= JSON.parse(localStorage.getItem('user'));
if(userAdmin)
{
if(userAdmin.role==="Admin")
setLog(true)
}
}, [user])

  useEffect(() => {
    
    isAuthenticated()
  }, [])

  return (
    
        
    <Router>
      
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/upload" element={<UploadPage />} />
        { log===true ?<Route path="/products" element={user.role ? <ProductsPage /> :(<Home/>) } /> :
      
      <Route path="/" element={ <Home/> }/>}
        <Route path="/orders" element={user ? <OrdersPage />:(<Home/>)} />
        <Route path="/avatar" element={user ? <UpdateMyInformation />:(<Home/>)} />
        <Route path="/product/add" element={<AddProductForm />} />
        <Route path="/product/update/:id" element={<UpdateProductForm />} />
        <Route path="/product/detail/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
     

    </Router>
    
    
  );
}

export default App;
