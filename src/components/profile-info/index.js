import useStore from "../../hooks/use-store";
import {useNavigate} from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import {useEffect} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Spinner from "../spinner";

const cn = bem("ProfilePage")

function ProfileInfo() {
  const store = useStore();
  const navigate = useNavigate();

  // const { t } = useTranslate();

  const select = useSelector(state => ({
    user: state.profile.data,
    token: state.profile.token,
    access: state.profile.access,
    waiting: state.profile.waiting
  }));

  useEffect(() => {
    store.actions.profile.profileLoad();
  }, []);

  useEffect(() => {
    if (!select.waiting && !select.access) {
      navigate('/login')
    }
  }, [select.access, select.waiting])

  if (select.waiting) {
    return <div><Spinner/></div>;
  }

  return (
    <div className={cn()}>
      <h2>Профиль</h2>
      <div className={cn("name")}>
        <p>Имя: <strong>{select.user?.profile?.name}</strong></p>
      </div>
      <div className={cn("phone")}>
        <p>Телефон: <strong>{select.user?.profile?.phone}</strong></p>
      </div>
      <div className={cn("email")}>
        <p>email: <strong>{select.user?.email}</strong></p>
      </div>
    </div>
  )
}

export default ProfileInfo;
