import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";

const { VITE_APP_SITE } = import.meta.env;

function Register() {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        "email": '',
        "password": '',
        "nickname": '',
        "role": 'user',
    });

    const [message, setMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const handleUserData = (e) => {
        const { name, value } = e.target;
        setUserData({...userData, [name]: value});
    }

    const register = () => {
        let regex = /^[\w.]+@[\w]+.[\w.]+/;
        if (userData.nickname === '' || userData.email === '' || userData.password === '') {
            setMessage('欄位不得空白')
        } else if (regex.test(userData.email)===false) {
            setMessage('帳號格式不正確') 
        } else {
            setIsLoading(true);
            axios.post(`${VITE_APP_SITE}/register`, userData)
            .then((res)=>{
                // console.log(res);
                Swal.fire({
                    icon: 'success',
                    toast: true,
                    position: 'top-start',
                    text: '註冊成功，請登入',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setIsLoading(false);
                navigate('/auth/login');
            })
            .catch((err)=>{
                console.log(err);
                setIsLoading(false);
                if (err.response.data === 'Email already exists') {
                    setMessage('用戶已存在') 
                } else { 
                    setMessage('帳號或密碼不正確')
                };
            })
        }
    }

    return (
    <div className="border rounded-4 p-5">
        <h2 className="mb-4 fw-bold">註冊</h2>
        <form>
            <div className="mb-2">
                <label htmlFor="nickname"
                       className="form-label">暱稱：</label>
                <input id="nickname"
                       type="text"
                       name="nickname"
                       className="form-control"
                       onFocus={()=>setMessage('')}
                       onChange={handleUserData}
                       autoComplete="false" />
            </div>
            <div className="mb-2">
                <label htmlFor="account"
                       className="form-label">帳號：</label>
                <input id="account"
                       type="email"
                       className="form-control"
                       name="email"
                       value={userData.email}
                       onFocus={()=>setMessage('')}
                       onChange={handleUserData}
                       autoComplete="false" />
            </div>
            <div className="mb-2">
                <label htmlFor="password"
                       className="form-label">密碼：</label>
                <input id="password"
                       type="password"
                       className="form-control"
                       name="password"
                       value={userData.password}
                       onFocus={()=>setMessage('')}
                       onChange={handleUserData}
                       autoComplete="false" />
            </div>
            <p className="my-4">已有帳號？請<NavLink to="/auth/login">登入</NavLink></p>
            <button type="button"
                    className="btn btn-primary"
                    disabled={ isLoading ? true : false }
                    onClick={()=>{register()}}>註冊</button>
            {message ? (<p className="m-0 mt-4"
                           style={{color: "#A73121"}}>{message}</p>) : (<></>)}
        </form>
    </div>)
}

export default Register;