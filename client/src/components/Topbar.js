import { useContext } from "react";

import { Link} from "react-router-dom";
import { Context } from "../context/Context";
import './Topbar.css';
//import { Link } from "react-scroll"

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  
  

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <img src='/images/Logo.png' alt="/" className="topIcon"/>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/Recipes">
              RECIPES
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about" >
              ABOUT US
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/contribute" >
              CONTRIBUTE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={user.message.user.avatar} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}