import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockSetIsModalOpen = jest.fn();
const mockSetCurrentNote = jest.fn()

const mockNote = {
  _id: '1',
  title: 'Test Note',
  content: '<p>This is a test note content</p>',
};

const mockOnDelete = jest.fn();

describe('NoteCard Component', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: Router });
  };

  test('renders NoteCard correctly', () => {
    renderWithRouter(<NoteCard note={mockNote} onDelete={mockOnDelete} />);

    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('This is a test note content')).toBeInTheDocument();
  });

  test('handles delete action', () => {
    renderWithRouter(<NoteCard note={mockNote} onDelete={mockOnDelete} />);

    global.confirm = jest.fn(() => true);
    fireEvent.click(screen.getByAltText('Delete'));

    expect(global.confirm).toHaveBeenCalledWith('Are you sure you want to delete this note?');
    expect(mockOnDelete).toHaveBeenCalledWith(mockNote._id);
  });

  test('handles edit action', () => {
    renderWithRouter(<NoteCard note={mockNote} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByAltText('Edit'));

    expect(mockNavigate).toHaveBeenCalledWith(`/edit/${mockNote._id}`, { state: { note: mockNote } });
  });
});
