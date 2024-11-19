import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GodPage.css';

const GodPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 15;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Токен отсутствует');
                    setLoading(false);
                    return;
                }
                
                const response = await axios.get('http://localhost:7000/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if (response.status === 200 && response.data) {
                    setUsers(response.data);
                } else {
                    console.error('Ошибка: данные не получены');
                }
            } catch (error) {
                console.error('Ошибка при загрузке пользователей:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowConfirmation(true);
    };

    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Токен отсутствует');
                return;
            }

            await axios.delete('http://localhost:7000/api/users/delete', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    id: userToDelete.id
                }
            });
            
            alert('Пользователь успешно удален');
            setUsers(users.filter((u) => u.id !== userToDelete.id));
            setShowConfirmation(false);
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
            alert('Ошибка при удалении пользователя');
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <div className="god-page">
            <h1>Страница бога</h1>
            {loading ? (
                <div>Загрузка...</div>
            ) : (
                <ul className="user-list">
                    {currentUsers.map((user, index) => (
                        <li key={user.id} className="user-item">
                            <span>{indexOfFirstUser + index + 1} - {user.tel || 'Телефон отсутствует'} ({user.role || 'Роль не указана'})</span>
                            {user.role !== 'GOD' ? (
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteClick(user)}
                                >
                                    🗑️
                                </button>
                            ) : (
                                <span className="no-delete">Бог</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            {showConfirmation && (
                <div className="confirmation-modal">
                    <p>Удалить пользователя?</p>
                    <button onClick={confirmDelete}>Подтвердить</button>
                    <button onClick={() => setShowConfirmation(false)}>Отмена</button>
                </div>
            )}
            {totalPages > 1 && (
                <div className="pagination">
                    {[...Array(totalPages).keys()].map((page) => (
                        <button
                            key={page}
                            className={`pagination-button ${currentPage === page + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(page + 1)}
                        >
                            {page + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GodPage;
