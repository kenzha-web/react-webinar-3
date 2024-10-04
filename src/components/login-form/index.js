import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import useStore from "../../hooks/use-store";
import {useNavigate} from "react-router-dom";
import './style.css';
import useTranslate from "../../hooks/use-translate";
import login from "../../app/login";

const cn = bem('LoginForm');

function LoginForm() {
  const store = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { t } = useTranslate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await store.actions.profile.login({
        login: email,
        password: password,
      });

      if (result && result.access) {
        navigate('/profile');
      } else {
        setError(t('login.error'));
      }
    } catch (err) {
      setError(err.message || t('login.error.message'));
    }
  };

  return (
    <div className={cn()}>
      <h3>{t('login.title')}</h3>
      <form onSubmit={handleSubmit}>
        <div className={cn('email')}>
          <label htmlFor="email">{t('login.login')}</label><br />
          <input
            type="text"
            name="email"
            id="email"
            required value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={cn('password')}>
          <label htmlFor="password">{t('login.password')}</label><br />
          <input
            type="password"
            name="password"
            id="password"
            required value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className={cn('error')}>{error}</div>}
        <div className={cn('btn')}>
          <button type="submit">{t('login.enter')}</button>
        </div>
      </form>
    </div>
  );
}

export default memo(LoginForm);
