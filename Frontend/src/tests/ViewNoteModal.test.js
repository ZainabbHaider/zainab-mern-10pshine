import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from 'react-modal';
import ViewNoteModal from '../pages/ViewNoteModal';
import '@testing-library/jest-dom';

beforeAll(() => {
  const root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.body.appendChild(root);
});

describe('ViewNoteModal Component', () => {
  const mockOnRequestClose = jest.fn();
  const note = {
    title: 'Test Note',
    content: '<p>This is a test note content</p>',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly when open', () => {
    render(
      <ViewNoteModal isOpen={true} onRequestClose={mockOnRequestClose} note={note} />
    );

    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('This is a test note content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /×/i })).toBeInTheDocument();
  });

  test('calls onRequestClose when close button is clicked', () => {
    render(
      <ViewNoteModal isOpen={true} onRequestClose={mockOnRequestClose} note={note} />
    );

    fireEvent.click(screen.getByRole('button', { name: /×/i }));
    expect(mockOnRequestClose).toHaveBeenCalledTimes(1);
  });
});