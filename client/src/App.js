import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from "./ProtectedRoute";
import AddAdmin from './Pages/admins/AddAdmin';
import Admins from './Pages/admins/Admins';
import EditAdmin from './Pages/admins/EditAdmin';
import Banner from './Pages/Banners/Banner';
import Categories from './Pages/categories/Categories';
import Earnings from './Pages/earnings/Earnings';
import Home from './Pages/Home/Home'
import EditNews from './Pages/news/EditNews';
import News from './Pages/news/News';

import Pano from './Pano';


import PushNews from './Pages/news/PushNews';
import NewsCategory from './Pages/newsCategory/NewsCategory';
import Notification from './Pages/notification/Notification';
import Orders from './Pages/orders/Orders';
import ViewOrder from './Pages/orders/ViewOrder'
import AddProduct from './Pages/products/AddProduct';
import Products from './Pages/products/Products';
import AddSeller from './Pages/sellers/AddSeller';
import Sellers from './Pages/sellers/Sellers';
import ViewSeller from './Pages/sellers/ViewSeller';
import AddStaticProduct from './Pages/static/AddStaticProduct';
import StaticProducts from './Pages/static/StaticProducts';
import AddStore from './Pages/stores/AddStore';
import Stores from './Pages/stores/Stores';
import Adduser from './Pages/users/Adduser';
import PrivacyPolicy from './Pages/Home/PrivacyPolicy';

import Users from './Pages/users/Users';
import ViewUser from './Pages/users/ViewUser';
import Login from './Components/login/Login'
import TopDeals from './Pages/topDeals/TopDeals';
import SellOnLybley from './Pages/SellOnLybley/SellOnLybley'

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setIsAuth(true);
    }
    setIsLoaded(true);
  }, []);
  return isLoaded && (
    <div className="main">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<ProtectedRoute name="login" isAuth={isAuth} Component={Login} />} />
          <Route path="/policy" element={<PrivacyPolicy/>} />

          <Route path="/home" element={<ProtectedRoute name="home" isAuth={isAuth} Component={Home} />} />
          <Route path="/" element={<ProtectedRoute name="home" isAuth={isAuth} Component={Home} />} />

          <Route path="users" element={<ProtectedRoute name="buyers" isAuth={isAuth} Component={Users} />} />
          <Route path="addUser" element={<ProtectedRoute name="buyers" isAuth={isAuth} Component={Adduser} />} />
          <Route path="viewUser" element={<ProtectedRoute name="buyers" isAuth={isAuth} Component={ViewUser} />} />

          <Route path="pano" element={<ProtectedRoute name="pano" isAuth={isAuth} Component={Pano} />} />



          <Route path="products" element={<ProtectedRoute name="products" isAuth={isAuth} Component={Products} />} />
          <Route path='addProduct' element={<ProtectedRoute name="products" isAuth={isAuth} Component={AddProduct} />} />
          <Route path='editProduct' element={<ProtectedRoute name="products" isAuth={isAuth} Component={AddProduct} />} />

          <Route path='sellOnLybley' element={<ProtectedRoute name="products" isAuth={isAuth} Component={SellOnLybley} />} />

          <Route path="topDeals" element={<ProtectedRoute name="topDeals" isAuth={isAuth} Component={TopDeals} />} />

          <Route path="banner" element={<ProtectedRoute isAuth={isAuth} Component={Banner} />} />

          <Route path="categories" element={<ProtectedRoute name="categories" isAuth={isAuth} Component={Categories} />} />


          <Route path="sellers" element={<ProtectedRoute name="sellers" isAuth={isAuth} Component={Sellers} />} />

          <Route path="addSeller" element={<ProtectedRoute name="sellers" isAuth={isAuth} Component={AddSeller} />} />
          <Route path="viewSeller" element={<ProtectedRoute name="sellers" isAuth={isAuth} Component={ViewSeller} />} />

          <Route path="stores" element={<ProtectedRoute name="stores" isAuth={isAuth} Component={Stores} />} />
          <Route path="addStores" element={<ProtectedRoute name="stores" isAuth={isAuth} Component={AddStore} />} />


          <Route path="newsCategory" element={<ProtectedRoute name="categories" isAuth={isAuth} Component={NewsCategory} />} />

          <Route path="earnings" element={<ProtectedRoute name="earnings" isAuth={isAuth} Component={Earnings} />} />


          <Route path="orders" element={<ProtectedRoute name="orders" isAuth={isAuth} Component={Orders} />} />
          <Route path="viewOrder" element={<ProtectedRoute name="orders" isAuth={isAuth} Component={ViewOrder} />} />


          <Route path="staticProducts" element={<ProtectedRoute name="staticProducts" isAuth={isAuth} Component={StaticProducts} />} />
          <Route path="addStaticProducts" element={<ProtectedRoute isAuth={isAuth} Component={AddStaticProduct} />} />


          <Route path="notification" element={<ProtectedRoute name="notifications" isAuth={isAuth} Component={Notification} />} />


          <Route path="news" element={<ProtectedRoute name="news" isAuth={isAuth} Component={News} />} />
          <Route path="news/push" element={<ProtectedRoute name="news" isAuth={isAuth} Component={PushNews} />} />
          <Route path="news/edit" element={<ProtectedRoute name="news" isAuth={isAuth} Component={EditNews} />} />


          <Route path="admins" element={<ProtectedRoute name="admin" isAuth={isAuth} Component={Admins} />} />
          <Route path="addAdmin" element={<ProtectedRoute name="admin" isAuth={isAuth} Component={AddAdmin} />} />
          <Route path="viewAdmin" element={<ProtectedRoute name="admin" isAuth={isAuth} Component={EditAdmin} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
