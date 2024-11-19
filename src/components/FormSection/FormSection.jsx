import React, { useState } from 'react';
import axios from 'axios';
import './FormSection.css';

const FormSection = () => {
  const [formData, setFormData] = useState({
    applicantFullName: '',
    missingPersonFullName: '',
    gender: 'М',
    birthDate: '',
    addressLoss: '',
    phoneNumber: '',
    missingDate: '',
    missingTime: '',
    contactNumber: '',
    circumstances: '',
    healthStatus: 'Нормальное',
    additionalInfo: '',
    topClothes: 'Куртка',
    bottomClothes: 'Брюки',
    headWear: 'Шапка',
    itemDescription: '',
  });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Функция для разделения ФИО на части
  const splitFullName = (fullName) => {
    const nameParts = fullName.trim().split(/\s+/);
    return {
      firstName: nameParts[1] || '',
      secondName: nameParts[0] || '',
      patronymic: nameParts[2] || '',
    };
  };

  // Функция для валидации поля ФИО
  const validateFullName = (name, value) => {
    if (value.trim().split(/\s+/).length > 3) {
      alert('Поле должно содержать не более трех слов');
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if ((name === 'applicantFullName' || name === 'missingPersonFullName') && !validateFullName(name, value)) {
      return;
    }

    if (name === 'phoneNumber' || name === 'contactNumber') {
      const formattedNumber = formatPhoneNumber(value);
      setFormData({ ...formData, [name]: formattedNumber });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Функция для форматирования телефонного номера
  const formatPhoneNumber = (input) => {
    input = input.replace(/\D/g, '');
    if (input.startsWith('7') || input.startsWith('8')) {
      input = input.slice(1);
    }
    if (input.length > 10) {
      input = input.slice(0, 10);
    }
    return `+7 (${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 8)}-${input.slice(8, 10)}`;
  };

  // Обработка выбора файла
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const applicantNames = splitFullName(formData.applicantFullName);
    const missingPersonNames = splitFullName(formData.missingPersonFullName);

    // Создание FormData для отправки данных вместе с файлом
    const dataToSend = new FormData();
    dataToSend.append('firstNameApplicant', applicantNames.firstName);
    dataToSend.append('secondNameApplicant', applicantNames.secondName);
    dataToSend.append('patronymicApplicant', applicantNames.patronymic);
    dataToSend.append('firstName', missingPersonNames.firstName);
    dataToSend.append('secondName', missingPersonNames.secondName);
    dataToSend.append('patronymic', missingPersonNames.patronymic);
    dataToSend.append('gender', formData.gender);
    dataToSend.append('birthday', formData.birthDate);
    dataToSend.append('addressLoss', formData.addressLoss);
    dataToSend.append('telMissing', formData.phoneNumber);
    dataToSend.append('dateLoss', formData.missingDate);
    dataToSend.append('timeLoss', formData.missingTime);
    dataToSend.append('contactNumberApplicant', formData.contactNumber);
    dataToSend.append('circumstances', formData.circumstances);
    dataToSend.append('healthStatus', formData.healthStatus);
    dataToSend.append('addInf', formData.additionalInfo);
    dataToSend.append('items', formData.itemDescription);
    dataToSend.append('topClothes', formData.topClothes);
    dataToSend.append('bottomClothes', formData.bottomClothes);
    dataToSend.append('headWear', formData.headWear);
    if (photo) {
      dataToSend.append('photo', photo); // Добавляем фото, если оно было выбрано
    }

    console.log("Отправляемые данные:", dataToSend);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:7000/api/reports', dataToSend, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Указываем заголовок для multipart данных
        },
      });
      setSuccess(response.data.message);
      alert('Форма успешно отправлена!');
    } catch (error) {
      setError('Ошибка при отправке формы');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="search-request" className="form-section container">
      <h2>Форма для заполнения (обязательна регистрация)</h2>
      <div className="form-grid">
        <div className="form-column">
          <label>
            Заявитель: ФИО (обязательно)
            <input
              type="text"
              name="applicantFullName"
              value={formData.applicantFullName}
              onChange={handleInputChange}
              placeholder="Иванов Иван Иванович"
              required
            />
          </label>

          <label>
            ФИО пропавшего (обязательно)
            <input
              type="text"
              name="missingPersonFullName"
              value={formData.missingPersonFullName}
              onChange={handleInputChange}
              placeholder="Петров Петр Петрович"
              required
            />
          </label>

          <label>Пол пропавшего</label>
          <div className="radio-group">
            <input
              type="radio"
              id="male"
              name="gender"
              value="М"
              checked={formData.gender === 'М'}
              onChange={handleInputChange}
            />
            <label htmlFor="male">Мужской</label>
            
            <input
              type="radio"
              id="female"
              name="gender"
              value="Ж"
              checked={formData.gender === 'Ж'}
              onChange={handleInputChange}
            />
            <label htmlFor="female">Женский</label>
          </div>

          <label>
            Дата рождения
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Район пропажи
            <input
              type="text"
              name="addressLoss"
              value={formData.addressLoss}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Номер телефона пропавшего
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="+7 (XXX) XXX-XX-XX"
              required
            />
          </label>

          <label>
            Дата пропажи
            <input
              type="date"
              name="missingDate"
              value={formData.missingDate}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Время пропажи
            <input
              type="time"
              name="missingTime"
              value={formData.missingTime}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Верхняя одежда пропавшего
            <select
              name="topClothes"
              value={formData.topClothes}
              onChange={handleInputChange}
            >
              <option value="Куртка">Куртка</option>
              <option value="Футболка">Футболка</option>
              <option value="Пальто">Пальто</option>
            </select>
          </label>

          <label>
            Нижняя одежда пропавшего
            <select
              name="bottomClothes"
              value={formData.bottomClothes}
              onChange={handleInputChange}
            >
              <option value="Брюки">Брюки</option>
              <option value="Джинсы">Джинсы</option>
              <option value="Шорты">Шорты</option>
            </select>
          </label>
          <label>
            Волосы/головной убор
            <select
              name="headWear"
              value={formData.headWear}
              onChange={handleInputChange}
            >
              <option value="Шапка">Шапка</option>
              <option value="Бейсболка">Бейсболка</option>
              <option value="Капюшон">Капюшон</option>
              <option value="Без головного убора">Без головного убора</option>
            </select>
          </label>

        </div>

        <div className="form-column">
          <label>
            Контакты заявителя: телефон для связи (обязательно)
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              placeholder="+7 (XXX) XXX-XX-XX"
              required
            />
          </label>

          <label>
            Обстоятельства пропажи (где последний раз видели)
            <textarea
              name="circumstances"
              value={formData.circumstances}
              onChange={handleInputChange}
              placeholder="Например: Пропал в районе Центрального парка около 18:00"
              required
            />
          </label>

          <label>
            Состояние здоровья пропавшего
            <select name="healthStatus" value={formData.healthStatus} onChange={handleInputChange}>
              <option value="Нормальное">Нормальное</option>
              <option value="Не очень">Не очень</option>
              <option value="Плохое">Плохое</option>
            </select>
          </label>

          <label>
            Дополнительная информация для поискового отряда
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              placeholder="Например: Есть аллергия на амброзию, нет татуировок"
            />
          </label>

          <label>
            Что у пропавшего было с собой
            <textarea
              name="itemDescription"
              value={formData.itemDescription}
              onChange={handleInputChange}
              placeholder="Например: Рюкзак синего цвета, серая бейсболка"
            />
          </label>
          <label>
            Фото пропавшего (опционально)
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handlePhotoChange}
            />
          </label>
        </div>
        
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Отправка...' : 'Отправить'}
      </button>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FormSection;
