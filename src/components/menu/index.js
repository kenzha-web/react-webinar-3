import { NavLink } from 'react-router-dom';
import {cn as bem} from "@bem-react/classname";
import './style.css'
import {ROUTES} from "../utils/routes";

const cn = bem('Menu');

function Menu() {
  return (
    <NavLink to={ROUTES.MAIN} className={cn('link')}>
      Главная
    </NavLink>
  );
}

export default Menu;
