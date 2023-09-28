import { Outlet } from "react-router-dom";

function Auth() {
    return (<>
    <div className="d-flex justify-content-center">
        <Outlet />
    </div>
    </>)
}

export default Auth;