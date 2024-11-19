import React from 'react';
import './UsefulResources.css'; // Подключаем стили

const UsefulResources = () => {
  return (
    <div className="useful-resources">
      <h2>Полезные ресурсы</h2>
      <div className="resources-section">
        <div className="resource-block">
          <h3>Телефоны экстренных служб по Нижнему Новгороду</h3>
          <ul>
            <li>Единая служба спасения:</li>
            <ul>
              <li>101</li>
              <li>102</li>
            </ul>
            <li>Полиция:</li>
            <ul>
              <li>102</li>
              <li>+7 (831) 431-53-79</li>
              <li>+7 (831) 431-55-60</li>
            </ul>
            <li>Скорая медицинская помощь:</li>
            <ul>
              <li>103</li>
            </ul>
            <li>Бюро регистрации несчастных случаев:</li>
            <ul>
              <li>002</li>
            </ul>
          </ul>
        </div>
        <div className="resource-block">
          <h3>Поисково-спасательный отряд "ЛизаАлерт"</h3>
          <p>
            Добровольческий поисковый отряд «ЛизаАлерт» - некоммерческое объединение, ставящее своей основной задачей оперативное реагирование и гражданское содействие в поиске пропавших всех категорий.
          </p>
          <p>
            Попасть на ресурс можно <a href="https://lizaalert.org" target="_blank" rel="noopener noreferrer">тут</a>.
          </p>
        </div>

      </div>
      <div class="profile-card">
  <span class="profile-name">Пуськов Гавел</span>
</div>

    </div>
  );
};

export default UsefulResources;
