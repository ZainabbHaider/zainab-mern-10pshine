import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import NotesScreen from '../pages/NotesScreen';
import '@testing-library/jest-dom';

jest.mock('axios');

jest.mock('../components/NoteCard', () => ({ note, onDelete }) => (
  <div>
    NoteCard Component
    <button onClick={() => onDelete(note._id)}>Delete</button>
  </div>
));

describe('NotesScreen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches and displays notes', async () => {
    const notesData = [
      { _id: '1', title: 'Note 1', content: 'Content 1' },
      { _id: '2', title: 'Note 2', content: 'Content 2' },
    ];

    axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: notesData }));

    await act(async () => {
      render(
        <Router>
          <NotesScreen />
        </Router>
      );
    });

    await waitFor(() => {
      expect(screen.getAllByText('NoteCard Component')).toHaveLength(2);
    });
  });

  test('handles note deletion', async () => {
    const notesData = [{ _id: '1', title: 'Note 1', content: 'Content 1' }];

    axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: notesData }));

    await act(async () => {
      render(
        <Router>
          <NotesScreen />
        </Router>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('NoteCard Component')).toBeInTheDocument();
    });

    axios.delete = jest.fn().mockImplementation(() => Promise.resolve({}));

    await act(async () => {
      fireEvent.click(screen.getByText('Delete'));
    });

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('/api/notes/1');
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });

  test('navigates to add note screen on button click', () => {
    render(
      <Router>
        <NotesScreen />
      </Router>
    );

    fireEvent.click(screen.getByText('+'));

    expect(window.location.pathname).toBe('/add');
  });
});
