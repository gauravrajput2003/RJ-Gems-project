import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: null
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Configure axios defaults
axios.defaults.baseURL = API_URL;

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set auth token in axios headers
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Load user from token
  const loadUser = async () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setAuthToken(token);
      try {
        const response = await axios.get('/auth/me');
        if (response.data.success) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user: response.data.data.user,
              token
            }
          });
        }
      } catch (error) {
        console.error('Load user error:', error);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        dispatch({ type: 'LOGOUT' });
      }
    }
    
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  // Register user (auto-login version)
  const register = async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const response = await axios.post('/auth/register', userData);
      
      if (response.data.success) {
        const { token, user } = response.data.data;
        setAuthToken(token);
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token }
        });
        
        // Set loading to false after successful registration
        dispatch({ type: 'SET_LOADING', payload: false });
        
        return { success: true, data: response.data };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: errorMessage };
    }
  };

  // Register user (no auto-login version)
  const registerOnly = async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const response = await axios.post('/auth/register', userData);
      
      if (response.data.success) {
        // Don't set auth token or login, just return success
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: true, data: response.data };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: errorMessage };
    }
  };

  // Login user
  const login = async (credentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const response = await axios.post('/auth/login', credentials);
      
      if (response.data.success) {
        const { token, user } = response.data.data;
        setAuthToken(token);
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token }
        });
        
        return { success: true, data: response.data };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthToken(null);
      dispatch({ type: 'LOGOUT' });
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const response = await axios.put('/auth/profile', userData);
      
      if (response.data.success) {
        dispatch({
          type: 'UPDATE_USER',
          payload: response.data.data.user
        });
        
        return { success: true, data: response.data };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const response = await axios.post('/auth/change-password', passwordData);
      
      if (response.data.success) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password change failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Load user on component mount
  useEffect(() => {
    loadUser();
  }, []);

  const value = {
    ...state,
    register,
    registerOnly,
    login,
    logout,
    updateProfile,
    changePassword,
    clearError,
    loadUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
