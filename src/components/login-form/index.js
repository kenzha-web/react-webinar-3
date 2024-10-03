import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const cn = bem('LoginForm');

function LoginForm({ onSubmit }) {
  const [credentials, setCredentials] = useState({ login: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  return (
    <div className={cn()}>
      <h3>Вход</h3>
      <form onSubmit={handleSubmit}>
        <div className={cn('email')}>
          <label htmlFor="email">Логин</label><br />
          <input
            type="email"
            name="login"
            id="login"
            value={credentials.login}
            onChange={handleChange}
            required
          />
        </div>
        <div className={cn('password')}>
          <label htmlFor="password">Пароль</label><br />
          <input
            type="password"
            name="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={cn('btn')}>
          <button type="submit">Вход</button>
        </div>
      </form>
    </div>
  );
}

export default memo(LoginForm);
