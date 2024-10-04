import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import useStore from "../../hooks/use-store";
import {useNavigate} from "react-router-dom";
import './style.css';

const cn = bem('LoginForm');

function LoginForm() {
  const store = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    store.actions.profile.login({
      login: email,
      password: password,
    }).then(({access}) => {
      access && navigate('/profile');
    });
  };

  return (
    <div className={cn()}>
      <h3>Вход</h3>
      <form onSubmit={handleSubmit}>
        <div className={cn('email')}>
          <label htmlFor="email">Логин</label><br />
          <input
            type="text"
            name="email"
            id="email"
            required value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={cn('password')}>
          <label htmlFor="password">Пароль</label><br />
          <input
            type="password"
            name="password"
            id="password"
            required value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={cn('btn')}>
          <button type="submit">Войти</button>
        </div>
      </form>
    </div>
  );
}

export default memo(LoginForm);
