import { useState, useEffect } from "react";

import axios from "axios";
import Swal from "sweetalert2";

import Aos from "aos";
import "aos/dist/aos.css";

function Loading() {
    return (
        <div className="alert border rounded-2 mt-2">
        資料讀取中，請稍候⋯⋯ {'ε≡ﾍ( ´∀`)ﾉ'}
        </div>
    )
}

const { VITE_APP_SITE } = import.meta.env;

function Views() {

    const [isLoading, setIsLoading] = useState(false);

    const [token, setToken] = useState('');

    const [userId, setUserId] = useState('');

    const [viewsData, setViewsData] = useState([]);
    
    const [collects, setCollects] = useState([]);

    useEffect(()=>{ 

        Aos.init();

        const token = document.cookie
        .split('; ').find((row)=>row.startsWith('token='))
        ?.split('=')[1];

        setToken(token);

        getData();
        getCollects();
    
    },[])

    const getData = async() => {
        try {
            setIsLoading(true);
            const res = await axios.get(`${VITE_APP_SITE}/views`);
            // console.log(res);
            setViewsData(res.data);
            setIsLoading(false);
        } catch(err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    const getCollects = async()=> {

        const userId = document.cookie
        .split('; ').find((row)=>row.startsWith('userId='))
        ?.split('=')[1];

        setUserId(Number(userId));

        try {
            const res = await axios.get(`${VITE_APP_SITE}/users/${userId}/collects`);
            // console.log(res.data);
            setCollects(res.data);
        } catch(error) {
            console.log(error);
        }
    }

    const handleCollection = async(view) => {
        try {
            const index = collects.findIndex((i) => i.body.id === view.id);
            if (index == -1) {
                const res = await axios.post(`${VITE_APP_SITE}/collects`, {
                    "userId": userId,
                    "body": view,
                });
                Swal.fire({
                    icon: 'success',
                    toast: true,
                    position: 'top-start',
                    text: '收藏成功！',
                    showConfirmButton: false,
                    timer: 1000,
                });
                // console.log(res.data);
                getCollects();
            } else {
                const res = await axios.delete(`${VITE_APP_SITE}/collects/${collects[index].id}`);
                Swal.fire({
                    icon: 'success',
                    toast: true,
                    position: 'top-start',
                    text: '取消成功！',
                    showConfirmButton: false,
                    timer: 1000,
                });
                // console.log(res.data);
                getCollects();
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (<>
    <h2 className="fw-bolder">景點一覽</h2>
        {isLoading ? (<Loading />) : (
        <div className="row">
            {viewsData.map((view)=>{
                return (
                <div key={view.id} className="col-md-6 g-3" data-aos="zoom-in" data-aos-duration="500">
                    <div className="card h-100">
                        <div className="card-header">＃{view.id}</div>
                        <div className="card-body d-flex flex-column justify-content-between">
                            <h3 className="card-title fw-bold mb-3">{view.name}</h3>
                            <p className="card-text flex-grow-1">{view.description}</p>
                            {token ? (
                            <div className="d-flex">
                                <div className="btn-favorite border rounded-3 px-2 py-1"
                                     onClick={()=>handleCollection(view)}>
                                {collects.findIndex((i)=>i.body.id === view.id) !== -1 ? (<>
                                    <span className="material-icons d-inline-block align-sub me-1 fs-5"
                                          style={{color: "#A73121"}}>clear</span>
                                    <span>取消收藏</span>
                                </>) : (<>
                                    <span className="material-icons d-inline-block align-sub me-1 fs-5"
                                          style={{color: "#A73121"}}>favorite</span>
                                    <span>加入收藏</span>
                                </>)}
                                </div>
                            </div>
                            ) : (<></>)}
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
        )}
    </>)
}

export default Views;