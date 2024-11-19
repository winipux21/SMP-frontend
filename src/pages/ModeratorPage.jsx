import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ModeratorPage.css';

const ModeratorPage = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Добавлено поле для хранения ошибок
    const [hoveredReport, setHoveredReport] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 15;

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:7000/api/reports/all', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Полученные данные:', response.data); // Лог для проверки данных
                setReports(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке заявок:', error);
                setError('Ошибка при загрузке данных'); // Устанавливаем сообщение об ошибке
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:7000/api/reports/moderate/${id}`, { status: 'approved' }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Заявка принята');
            setReports(reports.filter(report => report.id !== id));
        } catch (error) {
            console.error('Ошибка при принятии заявки:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:7000/api/reports/moderate/${id}`, { status: 'rejected' }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Заявка отклонена');
            setReports(reports.filter(report => report.id !== id));
        } catch (error) {
            console.error('Ошибка при отклонении заявки:', error);
        }
    };

    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

    const totalPages = Math.ceil(reports.length / reportsPerPage);

    return (
        <div className="moderator-page">
            <h1>Страница модерации заявок</h1>
            {loading ? (
                <div>Загрузка...</div>
            ) : error ? (
                <div className="error-message">{error}</div> // Отображаем ошибку, если она есть
            ) : (
                reports.length > 0 ? (
                    <ul className="report-list">
                        {currentReports.map((report, index) => (
                            <li
                                key={report.id}
                                className="report-item"
                                onMouseEnter={() => setHoveredReport(report.id)}
                                onMouseLeave={() => setHoveredReport(null)}
                            >
                                <span>{indexOfFirstReport + index + 1} - {report.firstNameApplicant} {report.secondNameApplicant} (Адрес: {report.addressLoss})</span>
                                <div className="actions">
                                    <button className="approve-button" onClick={() => handleApprove(report.id)}>✔️</button>
                                    <button className="reject-button" onClick={() => handleReject(report.id)}>❌</button>
                                </div>
                                {hoveredReport === report.id && (
                                    <div className="report-details">
                                        <p><strong>Заявитель (ФИО):</strong> {report.firstNameApplicant} {report.patronymicApplicant} {report.secondNameApplicant}</p>
                                        <p><strong>ФИО пропавшего:</strong> {report.firstName} {report.patronymic} {report.secondName}</p>
                                        <p><strong>Пол пропавшего:</strong> {report.gender === 'М' ? 'Мужской' : report.gender === 'Ж' ? 'Женский' : 'Не указано'}</p>
                                        <p><strong>Дата рождения:</strong> {report.birthday}</p>
                                        <p><strong>Адрес пропажи:</strong> {report.addressLoss}</p>
                                        <p><strong>Номер телефона пропавшего:</strong> {report.telMissing}</p>
                                        <p><strong>Дата пропажи:</strong> {report.dateLoss}</p>
                                        <p><strong>Время пропажи:</strong> {report.timeLoss}</p>
                                        <p><strong>Контакты заявителя:</strong> {report.contactNumberApplicant}</p>
                                        <p><strong>Обстоятельства пропажи:</strong> {report.circumstances}</p>
                                        <p><strong>Состояние здоровья пропавшего:</strong> {report.healthStatus}</p>
                                        <p><strong>Дополнительная информация:</strong> {report.addInf}</p>
                                        <p><strong>Верхняя одежда пропавшего:</strong> {report.topClothes}</p>
                                        <p><strong>Нижняя одежда пропавшего:</strong> {report.bottomClothes}</p>
                                        <p><strong>Волосы/головной убор:</strong> {report.headWear}</p>
                                        <p><strong>Что у пропавшего было с собой:</strong> {report.items}</p>
                                        {report.photoUrl && (
                                            <div className="report-photo">
                                                <strong>Фото:</strong>
                                                <img src={report.photoUrl} alt="Фото пропавшего" width="150" />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>Нет доступных заявок</div>
                )
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

export default ModeratorPage;
