import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import axios from 'axios';
import Login from '../pages/Login';

jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Storage.prototype, 'setItem');
  });

  test('renders login form', () => {
    render(
      <Router>
        <Login setIsLoggedIn={jest.fn()} />
      </Router>
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  test('handles input and submission correctly', async () => {
    const setIsLoggedIn = jest.fn();
    axios.post.mockResolvedValueOnce({ data: { user: 'test-user' } });
    
    render(
      <Router>
        <Login setIsLoggedIn={setIsLoggedIn} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByText(/Login/i));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    expect(axios.post).toHaveBeenCalledWith(
      '/api/users/login',
      { email: 'test@example.com', password: 'password' },
      { headers: { 'Content-type': 'application/json' } }
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'userInfo',
      JSON.stringify({ user: 'test-user' })
    );
    expect(setIsLoggedIn).toHaveBeenCalledWith(true);
    expect(mockNavigate).toHaveBeenCalledWith('/mynotes');
  });

  test('displays error message on failed login', async () => {
    const setIsLoggedIn = jest.fn();
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } },
    });

    render(
      <Router>
        <Login setIsLoggedIn={setIsLoggedIn} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByText(/Login/i));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });
});
