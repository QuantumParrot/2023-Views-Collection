import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";

function Index(){

    const navigate = useNavigate();

    useEffect(()=>{ Aos.init(); },[]);

    return (<>
    <div className="main d-flex flex-column justify-content-start align-items-center"
         style={{height: "960px"}}>
        <h3 className="main-quote w-100 my-4 p-3 display-4 fw-bolder"
            data-aos="fade-right"
            data-aos-duration="1000">探索自我，從旅行開始
        </h3>
        <button className="btn btn-primary my-4 px-4 py-2"
                data-aos="flip-left"
                data-aos-duration="1000"
                onClick={()=>navigate('/views')}>景點列表
        </button>
    </div>
    </>)
};

export default Index;