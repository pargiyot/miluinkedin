import { Link, Outlet } from "react-router-dom";
import "./navigation.styles.scss";
import { UserContext } from "../../context/user.context.js";
import { useContext } from "react";
import {
  SignOutUser,
  signInWithGoogle,
} from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const [userData] = useContext(UserContext);
  return (
    <>
      <div className="navigation">
        <div className="nav-links-container">
            <Link className="nav-link" to="/mymador">
              המדור שלי
            </Link>
          <Link className="nav-link" to="/search">
            חיפוש אנשי מילואים
          </Link>
          {userData.roles.includes("mador_manager") && (
            <Link className="nav-link" to="/users">
              חיפוש משתמשים
            </Link>
          )}
          {userData.roles.includes("mador_manager") && (
            <Link className="nav-link" to="/manage">
              הוספת אנשי מילואים למעקב
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
