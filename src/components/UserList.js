import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LogOut, Search } from 'lucide-react';
import { fetchUsers, deleteUser, updateUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import UserCard from './UserCard';
import UserModal from './UserModal';
import '../styles/UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const loadUsers = async (page) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchUsers(page);
      
      setUsers(data.data);
      setFilteredUsers(data.data);
      setTotalPages(data.total_pages);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      
      // Remove user from local state
      setUsers(users.filter(user => user.id !== userId));
      setFilteredUsers(filteredUsers.filter(user => user.id !== userId));
      
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error(`Failed to delete user: ${error.message}`);
    }
  };

  const handleUpdate = async (userId, updatedUser) => {
    try {
      const response = await updateUser(userId, updatedUser);
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, ...updatedUser } : user
      ));
      
      toast.success('User updated successfully');
    } catch (error) {
      toast.error(`Failed to update user: ${error.message}`);
    }
  };

  const handleLogout = () => {
    // Call the logout function from authService
    logout();
    
    // Show a logout toast
    toast.success('Logged out successfully');
    
    // Redirect to the login page
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Users</h2>
        <p>{error}</p>
        <button onClick={() => loadUsers(currentPage)} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="user-management-container">
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
      <header>
        <div className="header-left">
          <h1>User Management</h1>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>
      
      <div className="user-list-header">
        <h2>All Users ({filteredUsers.length} total)</h2>
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      
      {filteredUsers.length === 0 ? (
        <div className="no-users">
          <p>No users found.</p>
        </div>
      ) : (
        <div className="user-grid">
          {filteredUsers.map(user => (
            <UserCard 
              key={user.id} 
              user={user} 
              onEditClick={() => setSelectedUser(user)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      
      <div className="pagination">
        <button 
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="page-number">{currentPage}</span>
        <button 
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default UserList;