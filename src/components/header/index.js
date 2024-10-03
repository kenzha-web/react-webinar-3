import {NavLink} from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import './style.css'

const cn = bem("Header")

function Header() {
  return (
    <header className={cn()}>
      <button className={cn("btn")}>
        <NavLink to={'/login'} className={cn("btn")}>Вход</NavLink>
      </button>
    </header>
  )
}

export default Header;
