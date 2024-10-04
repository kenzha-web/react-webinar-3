import {NavLink} from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import './style.css'
import useTranslate from "../../hooks/use-translate";

const cn = bem("Header")

function Header() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    user: state.profile.data,
  }));

  const handleLogout = () => {
    store.actions.profile.logout();
  };

  return (
    <header className={cn()}>
      {select.user?.username ? (
          <div>
            <NavLink className={cn("nav")} to="/profile">{select.user?.profile?.name}</NavLink>
            <button className={cn("btn")} onClick={handleLogout}>{t('header.logout')}</button>
          </div>
        ) : (
          <NavLink to="/login"><button className={cn("btn")}>{t('header.login')}</button></NavLink>
        )
      }
    </header>
  )
}

export default Header;
