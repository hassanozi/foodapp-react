import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

export default function Header({title,description,imgUrl, className}) {


  return (
    <header style={{ width: "95%" }}>
      <div className="container-fluid">
        <div className="row align-items-center">

        
          <div className="col-md-8 text-white">
            <h4 className="mb-2">{title}</h4>
            <p className="mb-0">{description}</p>
          </div>

          
          <div className="col-md-4 d-flex justify-content-end">
            <img className="img-fluid" src={imgUrl}  />
          </div>

        </div>
      </div>
    </header>

  )
}
