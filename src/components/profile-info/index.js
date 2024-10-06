import useStore from "../../hooks/use-store";
import {useNavigate} from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import {useEffect} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';

const cn = bem("ProfilePage")

function ProfileInfo() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();

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

  return (
    <div className={cn()}>
      <h2>{t('profile.title')}</h2>
      <div className={cn("name")}>
        <p>{t('profile.name')} <strong>{select.user?.profile?.name}</strong></p>
      </div>
      <div className={cn("phone")}>
        <p>{t('profile.phone')} <strong>{select.user?.profile?.phone}</strong></p>
      </div>
      <div className={cn("email")}>
        <p>{t('profile.email')} <strong>{select.user?.email}</strong></p>
      </div>
    </div>
  )
}

export default ProfileInfo;
