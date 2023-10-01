import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";

const { VITE_APP_SITE } = import.meta.env;

function Admin() {

    const navigate = useNavigate();

    const [viewsData, setViewsData] = useState([]);

    useEffect(()=>{

        const role = document.cookie
        .split('; ').find((row)=>row.startsWith('role='))
        ?.split('=')[1];

        if (role !== 'admin') {
            Swal.fire({
                icon: 'error',
                text: '您無權限訪問此頁面，請先登入管理員帳號',
                showConfirmButton: true,
            });
            navigate('/auth/login')
        } else {
            getData();
        }

    },[]);

    const getData = async() => {
        try {
            const res = await axios.get(`${VITE_APP_SITE}/views`);
            // console.log(res);
            setViewsData(res.data);
        } catch(error) {
            console.log(error);
        }
    }

    const handleDelete = (id, name) => {
        try {
            Swal.fire({
                icon: 'warning',
                title: `確定刪除【${name}】嗎`,
                text: '注意：此動作不可復原，因為我還不會寫',
                showConfirmButton: true,
                showCancelButton:  true,
            }).then((result)=>{
                if (result.isConfirmed) {
                    axios.delete(`${VITE_APP_SITE}/views/${id}`)
                    .then((res)=>{
                        console.log(res);
                        getData();
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
                    });
                }
            })
        } catch(error) {
            console.log(error);
        }
    }

    const [newView, setNewView] = useState({
        "name": '',
        "description": ''
    })

    const handleNewView = (e) => {
        const { name, value } = e.target;
        setNewView({...newView, [name]: value});
    }

    const addNewView = async() => {
        try {
            const res = await axios.post(`${VITE_APP_SITE}/views`, newView);
            console.log(res);
            Swal.fire({
                icon: 'success',
                toast: true,
                position: 'top-start',
                text: '新增成功！',
                showConfirmButton: false,
                timer: 1500,
            });
            setNewView({
                "name": '',
                "description": ''
            });
            getData();
        } catch(error) {
            console.log(error);
        }
    }

    const [editView, setEditView] = useState({
        "name": '',
        "description": ''
    });

    const handleEditView = (e) => {
        const { name, value } = e.target;
        setEditView({...editView, [name]: value});
    }

    const edit = async(id) => {
        try {
            const res = await axios.patch(`${VITE_APP_SITE}/views/${id}`, editView);
            Swal.fire({
                icon: 'success',
                toast: true,
                position: 'top-start',
                text: '修改成功！',
                showConfirmButton: false,
                timer: 1500,                
            })
            getData();
        } catch(error) {
            console.log(error);
        }
    }
 
    return (<>
    <div>
        <div className="d-flex mb-4">
            <h2 className="fw-bolder m-0 me-4">後台管理</h2>
            <button type="button"
                    className="btn btn-primary py-1"
                    data-bs-toggle="modal"
                    data-bs-target="#addView">新增景點
            </button>
            <div id="addView" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content p-4">
                        <label htmlFor="name"
                               className="form-label">景點名稱：</label>
                        <input id="name"
                               type="text"
                               className="mb-2 px-2 py-1"
                               name="name"
                               value={newView.name}
                               onChange={(e)=>handleNewView(e)} />
                        <label htmlFor="description"
                               className="form-label">景點描述：</label>
                        <textarea id="description"
                                  type="text"
                                  className="mb-4 px-2 py-1"
                                  name="description"
                                  value={newView.description}
                                  onChange={(e)=>handleNewView(e)} />
                        <div className="d-flex">
                            <button type="button"
                                    data-bs-dismiss="modal"
                                    className="btn btn-primary"
                                    onClick={addNewView}>新增
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col" width="60" className="text-center">＃</th>
                    <th scope="col">景點</th>
                    <th scope="col" width="60" className="text-center">修改</th>
                    <th scope="col" width="60" className="text-center">刪除</th>
                </tr>
            </thead>
            <tbody>
            {viewsData.map((view)=>{
                return (
                    <tr key={view.id}>
                        <th className="text-center align-middle">{view.id}</th>
                        <th>
                            {view.name}
                            <br />
                            <small className="text-muted">{view.description}</small>
                        </th>
                        <th className="text-center align-middle">
                            <span className="material-icons btn-linklike"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editView"
                                  onClick={()=>setEditView(view)}>edit</span>
                            <div id="editView" className="modal fade">
                                <div className="modal-dialog">
                                    <div className="modal-content p-4">
                                        <label htmlFor="name"
                                               className="form-label">景點名稱：</label>
                                        <input id="name"
                                               type="text"
                                               className="mb-2 px-2 py-1"
                                               name="name"
                                               value={editView.name} 
                                               onChange={(e)=>handleEditView(e)} />
                                        <label htmlFor="description"
                                               className="form-label">景點描述：</label>
                                        <textarea id="description"
                                                  type="text"
                                                  className="mb-4 px-2 py-1"
                                                  name="description"
                                                  value={editView.description}
                                                  onChange={(e)=>handleEditView(e)} />
                                        <div className="d-flex justify-content-center">
                                            <button type="button"
                                                    data-bs-dismiss="modal"
                                                    className="btn btn-primary"
                                                    onClick={()=>edit(editView.id)}>修改
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </th>
                        <th className="text-center align-middle">
                            <span className="material-icons btn-linklike"
                                  onClick={()=>handleDelete(view.id, view.name)}>delete</span>
                        </th>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>
    </>)   
}

export default Admin;