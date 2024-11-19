import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Проверка сложности пароля
  const validatePassword = (password) => {
    const lengthCheck = password.length > 5;
    const digitCheck = /\d/.test(password);
    const symbolCheck = /[!@#$%&*]/.test(password);
    const latinCheck = /^[A-Za-z0-9!@#$%&*]+$/.test(password);

    return lengthCheck && digitCheck && symbolCheck && latinCheck;
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Предотвращает перезагрузку страницы
    try {
      const response = await axios.post('http://localhost:7000/api/auth/login', {
        tel,
        password,
      });
      localStorage.setItem('token', response.data.token);
      alert('Вход выполнен успешно!');
      window.location.reload(); // Перезагрузка страницы для обновления состояния навбара
    } catch (error) {
      console.error('Ошибка при входе:', error);
      alert('Ошибка при входе. Проверьте телефон и пароль.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Предотвращает перезагрузку страницы
    if (!validatePassword(password)) {
      alert('Пароль должен быть больше 5 символов, содержать цифру, символ из !,@,#,$,%,&,*, и только латинские буквы.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:7000/api/auth/register', {
        tel,
        password,
      });
      localStorage.setItem('token', response.data.token);
      alert('Регистрация прошла успешно!');
      window.location.reload(); // Перезагрузка страницы для обновления состояния навбара
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      alert('Ошибка при регистрации. Проверьте введенные данные.');
    }
  };

  return (
    <div className="login-register-form">
      <h3>{isRegisterMode ? 'Регистрация' : 'Вход'}</h3>
      <form onSubmit={isRegisterMode ? handleRegister : handleLogin}>
        <input
          type="tel"
          placeholder="Телефон"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          required
          className="login-input" /* Применение класса для обводки и выравнивания */
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input" /* Применение класса для обводки и выравнивания */
        />
        <button type="submit" className="login-button">
          {isRegisterMode ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>
      <div className="toggle-mode">
        <p>
          {isRegisterMode ? 'Уже зарегистрированы?' : 'Нет аккаунта?'}{' '}
          <span onClick={() => setIsRegisterMode(!isRegisterMode)}>
            {isRegisterMode ? 'Войти' : 'Зарегистрироваться'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
