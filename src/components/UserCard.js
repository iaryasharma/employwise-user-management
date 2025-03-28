import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import '../styles/UserCard.css';

const UserCard = ({ user, onEditClick, onDelete }) => {
  return (
    <div className="user-card">
      <img 
        src={user.avatar} 
        alt={`${user.first_name} ${user.last_name}`} 
        className="user-avatar" 
      />
      <div className="user-details">
        <h3>{`${user.first_name} ${user.last_name}`}</h3>
        <p>{user.email}</p>
      </div>
      <div className="user-actions">
        <button 
          className="edit-button"
          onClick={() => onEditClick(user)}
        >
          <Edit size={16} />
          Edit
        </button>
        <button 
          className="delete-button"
          onClick={() => onDelete(user.id)}
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;