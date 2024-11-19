import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Login from '../Login/Login'; // Проверьте, что путь к файлу верный
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userTel, setUserTel] = useState('');
  const [userRole, setUserRole] = useState(''); // Новое состояние для роли пользователя
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userInfo = JSON.parse(atob(token.split('.')[1])); // Декодирование токена
      setUserTel(userInfo.tel);
      setUserRole(userInfo.role); // Получение роли пользователя
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserTel('');
    setUserRole(''); // Сброс роли пользователя
    window.location.reload(); // Перезагрузка страницы для обновления состояния
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="#home">W21</a> {/* Логотип с якорной ссылкой */}
        </div>
        <div className="navbar-links">
          {userRole === 'MODERATOR' && (
            <Link to="/moderator" target="_blank" rel="noopener noreferrer">MOD</Link>
          )}
          {userRole === 'GOD' && (
            <>
              <Link to="/moderator" target="_blank" rel="noopener noreferrer">MOD</Link>
              <Link to="/god" target="_blank" rel="noopener noreferrer">GOD</Link>
            </>
          )}
          <a href="#reports">Заявка на поиск</a> {/* Ссылка по якорю */}
          <a href="#map">К карте</a> {/* Ссылка по якорю */}
          <a href="#help">Помощь</a> {/* Ссылка по якорю */}
          {isLoggedIn ? (
            <div className="user-info">
              <span>{userTel}</span>
              <button onClick={handleLogout} className="logout-button">Выйти</button>
            </div>
          ) : (
            <div 
              className="navbar-dropdown"
              onMouseEnter={() => setShowLogin(true)}
              onMouseLeave={() => setShowLogin(false)}
            >
              <button className="dropdown-button">Регистрация</button>
              {showLogin && (
                <div className="dropdown-content">
                  <Login />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;