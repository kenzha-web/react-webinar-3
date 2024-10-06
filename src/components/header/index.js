import { NavLink } from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import './style.css';
import {useEffect} from "react";

const cn = bem("Header");

function Header({ loginLabel, logoutLabel }) {
  const store = useStore();

  const { user } = useSelector(state => ({
    user: state.profile.data,
  }));

  const handleLogout = () => {
    store.actions.profile.logout();
  };

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
    });

    return () => unsubscribe();
  }, [store]);

  return (
    <header className={cn()}>
      {user?.username ? (
        <div className={cn("auth")}>
          <NavLink className={cn("nav")} to="/profile">
            {user.profile?.name || user.username}
          </NavLink>
          <button className={cn("btn")} onClick={handleLogout}>
            {logoutLabel}
          </button>
        </div>
      ) : (
        <NavLink to="/login">
          <button className={cn("btn")}>{loginLabel}</button>
        </NavLink>
      )}
    </header>
  );
}

export default Header;
