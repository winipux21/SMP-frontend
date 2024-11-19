// LogList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LogList.css';

const LogList = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:7000/api/logs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogs(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchLogs();
  }, []);

  const displayedLogs = logs.slice(0, 8); // Отображаем только последние 8 логов

  return (
    <div className="log-list">
      {displayedLogs.length > 0 ? (
        displayedLogs.map((log, index) => (
          <div key={log.id || index} className="log-item">
            <span className="log-message">{log.message}</span>
            <span className="log-time">
  {log.time && !isNaN(new Date(log.time).getTime()) 
    ? new Date(log.time).toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : 'Неизвестная дата'}
</span>
          </div>
        ))
      ) : (
        <div className="log-item">Последнюю информацию о пропавших можете узнать после регистрации</div>
      )}
    </div>
  );
};

export default LogList;
