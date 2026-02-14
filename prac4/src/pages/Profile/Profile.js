import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-card">
        <div className="profile-avatar">
          <div className="avatar-circle">П</div>
        </div>
        <h2>Профиль пользователя</h2>
        <div className="profile-info">
          <div className="info-item">
            <span className="info-label">Имя:</span>
            <span className="info-value">Пользователь</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">user@example.com</span>
          </div>
          <div className="info-item">
            <span className="info-label">Статус:</span>
            <span className="info-value">Онлайн</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
