import axios from 'axios';

const BASE_URL = 'https://reqres.in/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchUsers = async (page = 1) => {
  try {
    const response = await apiClient.get(`/users?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    // For reqres.in, we'll simulate a successful update
    console.log(`Simulating update for user ${id}:`, userData);
    return {
      id,
      ...userData,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    // Simulate delete for reqres.in
    console.log(`Simulating delete for user ${id}`);
    return { message: 'User deleted successfully' };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};