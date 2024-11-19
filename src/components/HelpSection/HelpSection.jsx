import React, { useState } from 'react';
import './HelpSection.css';
import forestImage from '../../assets/forestarea.png';
import urbanImage from '../../assets/urbanarea.png';
import spermImage from '../../assets/sperm.png';
import universeImage from '../../assets/universe.png';
import inadequateImage from '../../assets/inadequate.png';
import searchFamilyImage from '../../assets/searchfamily.png';

const HelpSection = () => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <section id="help" className="help-section">
      <h2>Как можно помочь?</h2>
      <img src={searchFamilyImage} alt="Поиск семьи" className="main-image" />

      {/* Новые блоки */}
      <div className="instruction-block">
        <div className="instruction-text">
          <h3>Выезд на нужные координаты</h3>
          <p>На карте указаны точки раннего местоположения потерявшихся, следуйте координатам с сайта для помощи.</p>
        </div>
        <div className="instruction-image-container">
          <img src={spermImage} alt="Иконка выезда" className="instruction-image" />
        </div>
      </div>

      <div className="instruction-block">
        <div className="instruction-text">
          <h3>Поиск человека по данным с сайта</h3>
          <p>Поиск осуществляется с опорой на данные о человеке с сайта, такие как: фото, описание одежды, координаты.</p>
        </div>
        <div className="instruction-image-container">
          <img src={universeImage} alt="Иконка поиска" className="instruction-image" />
        </div>
      </div>

      <div className="instruction-block">
        <div className="instruction-text">
          <h3>Если вы нашли человека</h3>
          <p>Позвоните по номеру, указанному на карточке потерявшегося и сообщите доверенному лицу о находке.</p>
        </div>
        <div className="instruction-image-container">
          <img src={inadequateImage} alt="Иконка сообщения" className="instruction-image" />
        </div>
      </div>

      {/* Существующие блоки */}
      <div className="help-content">
        <div className="help-block">
          <img src={urbanImage} alt="Городская местность" />
          <h3>Городская местность</h3>
          <p>
            Люди теряются не только в природе. В городе люди теряются чаще. Городской поиск не отменяет возможность получить задачу в природной среде (парки, лесопарки), но задач больше “городских” (расклейка ориентировок, патруль, опрос, осмотр).
          </p>
        </div>
        <div className="help-block">
          <img src={forestImage} alt="Лесная местность" />
          <h3>Лесная местность</h3>
          <p>
            Лесной поиск — поиск в природной среде. Задачи в основном “лесные” (работа по откликам, прочес, работа по линейным ориентирам, осмотр, оконтуривание больших площадных объектов и т.д.). Но и городские задачи могут быть.
          </p>
        </div>
      </div>

      {/* Дополнительный контент */}
      {showDetails && (
        <div className="details-wrapper">
          <div className="details-block right">
            <h4 className="details-subheading">С собой иметь обязательно:</h4>
            <ul className="details-list">
              <li>Заряженный телефон</li>
              <li>Удобная одежда и обувь по погоде</li>
              <li>Личные медикаменты</li>
            </ul>
            <h4 className="details-subheading">Желательно:</h4>
            <ul className="details-list">
              <li>Скотч, ножницы, ручка и блокнот</li>
              <li>Светоотражающий жилет</li>
              <li>Пауэрбанк</li>
              <li>Плащ-дождевик</li>
              <li>Перчатки</li>
            </ul>
          </div>

          <div className="details-block left">
            <h4 className="details-subheading">С собой иметь обязательно:</h4>
            <ul className="details-list">
              <li>Заряженный телефон</li>
              <li>Удобная одежда и обувь по погоде</li>
              <li>Вода (не менее 1 л на человека)</li>
              <li>Личные медикаменты</li>
              <li>Репеллент</li>
            </ul>
            <h4 className="details-subheading">Желательно:</h4>
            <ul className="details-list">
              <li>Горячий чай</li>
              <li>Защитные очки</li>
              <li>Пауэрбанк</li>
              <li>Плащ-дождевик</li>
              <li>Перчатки</li>
              <li>Запас батареек AA</li>
            </ul>
          </div>
        </div>
      )}

      {/* Кнопка перемещается вниз */}
      <button className="toggle-button" onClick={toggleDetails}>
        {showDetails ? '\uFE3F' : '\uFE40'}
      </button>
    </section>
  );
};

export default HelpSection;
