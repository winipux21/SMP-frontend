import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import axios from 'axios';
import './MapPlaceholder.css';

const MapPlaceholder = () => {
  const [reports, setReports] = useState([]);
  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/reports/map-data');
        
        // Лог для проверки данных
        console.log('Одобренные заявки, полученные от API:', response.data);

        setReports(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных для карты:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <YMaps>
      <Map
        defaultState={{ center: [56.326887, 44.005986], zoom: 12 }}
        width="100%"
        height="400px"
      >
        {reports.map((report) => (
          <Placemark
            key={report.id}
            geometry={[report.latitude, report.longitude]}
            properties={{
              balloonContentHeader: `<strong>${report.firstName} ${report.secondName}</strong>`,
              balloonContentBody: `
                <p><strong>Заявитель:</strong> ${report.firstNameApplicant} ${report.patronymicApplicant || ''} ${report.secondNameApplicant}</p>
                <p><strong>Дата рождения пропавшего:</strong> ${report.birthday || 'Не указано'}</p>
                <p><strong>Пол:</strong> ${report.gender === 'М' ? 'Мужской' : report.gender === 'Ж' ? 'Женский' : 'Не указано'}</p>
                <p><strong>Адрес пропажи:</strong> ${report.addressLoss}</p>
                <p><strong>Номер телефона пропавшего:</strong> ${report.telMissing || 'Не указано'}</p>
                <p><strong>Дата пропажи:</strong> ${new Date(report.dateLoss).toLocaleDateString('ru-RU')}</p>
                <p><strong>Время пропажи:</strong> ${report.timeLoss || 'Не указано'}</p>
                <p><strong>Контактный номер заявителя:</strong> ${report.contactNumberApplicant}</p>
                <p><strong>Обстоятельства:</strong> ${report.circumstances || 'Не указано'}</p>
                <p><strong>Состояние здоровья:</strong> ${report.healthStatus || 'Не указано'}</p>
                <p><strong>Дополнительная информация:</strong> ${report.addInf || 'Не указано'}</p>
                <p><strong>Что было с собой:</strong> ${report.items || 'Не указано'}</p>
                <p><strong>Верхняя одежда:</strong> ${report.topClothes || 'Не указано'}</p>
                <p><strong>Нижняя одежда:</strong> ${report.bottomClothes || 'Не указано'}</p>
                <p><strong>Волосы/головной убор:</strong> ${report.headWear || 'Не указано'}</p>
                ${report.photoUrl ? `<img src="${report.photoUrl}" alt="Фото пропавшего" width="100" />` : ''}
              `,
            }}
            modules={['geoObject.addon.balloon']}
          />
        ))}
      </Map>
    </YMaps>
  );
};

export default MapPlaceholder;
