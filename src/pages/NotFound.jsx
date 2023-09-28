import { NavLink } from "react-router-dom";

function NotFound() {
    return (
    <div className="container d-flex justify-content-center">
        <div>
            <h2 className="mb-4 fw-bolder">Oops ...</h2>
            <p>查無此路由，請再次檢查網址是否輸入正確</p>
            <p className="text-center">回到<NavLink to="/">首頁</NavLink></p>
        </div>
    </div>)
};

export default NotFound;