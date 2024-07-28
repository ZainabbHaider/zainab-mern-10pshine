import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Navbar Component', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: Router });
  };

  test('renders correctly when logged out', () => {
    renderWithRouter(<Navbar isLoggedIn={false} />);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.queryByText('My Notes')).not.toBeInTheDocument();
    expect(screen.queryByText('New Note')).not.toBeInTheDocument();
    expect(screen.queryByText('My Profile')).not.toBeInTheDocument();
  });

  test('renders correctly when logged in', () => {
    renderWithRouter(<Navbar isLoggedIn={true} />);

    expect(screen.getByText('My Notes')).toBeInTheDocument();
    expect(screen.getByText('New Note')).toBeInTheDocument();
    expect(screen.getByText('My Profile')).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
  });

  test('navigates to the correct routes when buttons are clicked while logged in', () => {
    renderWithRouter(<Navbar isLoggedIn={true} />);

    fireEvent.click(screen.getByText('My Notes'));
    expect(mockNavigate).toHaveBeenCalledWith('/mynotes');

    fireEvent.click(screen.getByText('New Note'));
    expect(mockNavigate).toHaveBeenCalledWith('/add');

    fireEvent.click(screen.getByText('My Profile'));
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });

  test('navigates to the correct routes when links are clicked while logged out', () => {
    renderWithRouter(<Navbar isLoggedIn={false} />);

    fireEvent.click(screen.getByText('Sign In'));
    expect(window.location.pathname).toBe('/login');

    fireEvent.click(screen.getByText('Sign Up'));
    expect(window.location.pathname).toBe('/register');
  });
});
