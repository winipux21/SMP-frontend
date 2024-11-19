import React from 'react';
import './TeamSection.css';
import chlen1 from '../../assets/chlen1.png';
import chlen2 from '../../assets/chlen2.png';
import chlen3 from '../../assets/chlen3.png';
import chlen4 from '../../assets/chlen4.png';
import chlen5 from '../../assets/chlen5.png';
import chlen6 from '../../assets/chlen6.png';

const teamMembers = [
    { id: 1, name: 'Игор', role: 'Капитан', image: chlen1 },
    { id: 2, name: 'Некит', role: 'Фронт-энд', image: chlen2 },
    { id: 3, name: 'Гдеб', role: 'Бэк-энд', image: chlen3 },
    { id: 4, name: 'Паб', role: 'Тестирование', image: chlen4 },
    { id: 5, name: 'Дан', role: 'Управление проектом', image: chlen5 },
    { id: 6, name: 'Айран', role: 'Документация', image: chlen6 },
  ];

const TeamSection = () => {
  return (
    <div className="team-section-container">
      <div className="team-section">
        <h2>Команда «Три якоря» представляет</h2>
        <div className="team-members">
          {teamMembers.map(member => (
            <div className="team-member" key={member.id}>
              <div className="member-photo">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <p>{member.name}</p>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
