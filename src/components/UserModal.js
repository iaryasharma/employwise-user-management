import React, { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import '../styles/UserModal.css';

const UserModal = ({ user, onClose, onSave, onDelete }) => {
  const [editedUser, setEditedUser] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setEditedUser({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    if (!editedUser.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }

    if (!editedUser.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!editedUser.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(editedUser.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      const updatedUser = {
        first_name: editedUser.first_name,
        last_name: editedUser.last_name,
        email: editedUser.email,
        avatar: user.avatar  // Preserve the avatar
      };
      
      onSave(user.id, updatedUser);
      onClose();
    }
  };

  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit User</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          <img 
            src={user.avatar} 
            alt={`${user.first_name} ${user.last_name}`} 
            className="modal-avatar" 
          />
          <div className={`form-group ${errors.first_name ? 'error' : ''}`}>
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={editedUser.first_name}
              onChange={handleChange}
              placeholder="Enter first name"
            />
            {errors.first_name && <span className="error-text">{errors.first_name}</span>}
          </div>
          <div className={`form-group ${errors.last_name ? 'error' : ''}`}>
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={editedUser.last_name}
              onChange={handleChange}
              placeholder="Enter last name"
            />
            {errors.last_name && <span className="error-text">{errors.last_name}</span>}
          </div>
          <div className={`form-group ${errors.email ? 'error' : ''}`}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
        </div>
        <div className="modal-footer">
          <button 
            className="delete-btn" 
            onClick={() => {
              onDelete(user.id);
              onClose();
            }}
          >
            <Trash2 size={16} />
            Delete User
          </button>
          <button 
            className="save-btn" 
            onClick={handleSave}
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;