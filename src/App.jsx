import { useState } from "react";
import { Route, Routes, NavLink, useNavigate, Link } from "react-router-dom";
import './css/all.scss';

import Swal from "sweetalert2";

import Index from './pages/Index';
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Views from "./pages/Views";
import Collection from "./pages/Collection";
import NotFound from "./pages/NotFound";

function App(){

  const navigate = useNavigate();

  const userName = document.cookie
  .split('; ').find((row)=>row.startsWith('userName='))
  ?.split('=')[1];

  const logout = () => {
    document.cookie = "token=; Max-Age=-1";
    document.cookie = "userName=; Max-Age=-1";
    document.cookie = "userId=; Max-Age=-1";  
    document.cookie = "role=; Max-Age=-1";
    Swal.fire({
      icon: 'success',
      toast: true,
      position: 'top-start',
      text: '登出成功！',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  return (<>
    <div className="header container-fluid d-flex justify-content-between align-items-center p-2">
      <h1 className="d-flex display-6 fw-bold">
        <div className="pe-2">
          <span className="material-icons align-sub grad-purple" style={{fontSize: "inherit"}}>travel_explore</span>
        </div>
        <span className="grad-blue"
              style={{cursor: 'pointer'}}
              onClick={()=>navigate('/')}>Views Collection</span>
      </h1>
      <div className="d-flex justify-content-between">
      {userName ? (
      <>
        <div className="me-2">{userName}您好！</div>
        <div><NavLink to="/views">
          景點一覽
        </NavLink></div>｜
        <div><NavLink to="/collection">
          我的收藏
        </NavLink></div>｜
        <div><NavLink to="/" onClick={logout}>
          登出
        </NavLink></div>
      </>) : (
      <>
        訪客您好！
        請<NavLink to="/auth/login">登入</NavLink>
        或<NavLink to="/auth/register">註冊</NavLink>，開啟景點收藏功能
      </>)}
      </div>
    </div>
    <div className="container vh-container d-flex flex-column justify-content-center my-3">
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
      </Route>
      <Route path="/views" element={<Views />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
    <div className="footer d-flex justify-content-between p-4">
      <p className="m-0">Copyright © 2023 Views Collection {"(Hexschool Test Project)"}</p>
      <div>
        <NavLink to="/admin">後台管理</NavLink>
      </div>
    </div>
  </>)
}

export default App;