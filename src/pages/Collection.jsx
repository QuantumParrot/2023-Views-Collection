import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";

function Empty() {
    return (
        <div className="alert border rounded-2 mt-2">
        尚未收藏任何景點，前往<NavLink to="/views">景點一覽</NavLink>查看 {'┏( .-. ┏ ) ┓'}
        </div>
    )
}

function Collection() {

    const { VITE_APP_SITE } = import.meta.env;

    const navigate = useNavigate();

    const [collects, setCollects] = useState([]);

    useEffect(()=>{

        const token = document.cookie
        .split('; ').find((row)=>row.startsWith('token='))
        ?.split('=')[1];

        if (!token) {

            Swal.fire({
                icon: 'error',
                text: '請先登入',
                showConfirmButton: true,
            });
            
            navigate('/auth/login');
            
        } else { 
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            getCollects();
        
        }

    },[])

    const getCollects = () => {

        const userId = document.cookie
        .split('; ').find((row)=>row.startsWith('userId='))
        ?.split('=')[1];

        axios.get(`${VITE_APP_SITE}/660/users/${userId}/collects`)
        .then((res)=>{
            // console.log(res.data);
            setCollects(res.data);
        }).catch((error)=>{
            console.log(error);
        })

    }

    const handleDelete = (id, name) => {
        try {
            Swal.fire({
                icon: 'warning',
                title: `確定刪除【${name}】嗎`,
                showConfirmButton: true,
                showCancelButton:  true,
            })
            .then((result)=>{
                if(result.isConfirmed) {
                    axios.delete(`${VITE_APP_SITE}/600/collects/${id}`)
                    .then((res)=>{
                        console.log(res);
                        getCollects();
                        Swal.fire({
                            icon: 'success',
                            toast: true,
                            position: 'top-start',
                            text: `刪除成功`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        } catch(error) {
            console.log(error);
        }
    }

    return (<>
    <h2 className="fw-bolder">我的收藏</h2>
        {collects.length ? (
            <div className="row">
                {collects.map(({ body, id })=>{
                    return (
                    <div key={body.id} className="col-12 g-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h3 className="card-title fw-bold mb-3">{body.name}</h3>
                                    <span className="material-icons cursor-pointer fs-2"
                                          style={{color: "#A73121"}}
                                          onClick={()=>handleDelete(id, body.name)}>clear
                                    </span>
                                </div>
                                <p className="card-text">{body.description}</p>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        ) : (<Empty />) }
    </>)
}

export default Collection;