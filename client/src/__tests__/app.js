import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App', () => {
  test('renders home page', () => {
    render(<App />, { wrapper: MemoryRouter });
    expect(screen.getByRole('heading', { name: /home page/i })).toBeInTheDocument();
  });

  test('renders login page', () => {
    render(<App />, { wrapper: MemoryRouter });
    userEvent.click(screen.getByRole('link', { name: /login/i }));
    expect(screen.getByRole('heading', { name: /login page/i })).toBeInTheDocument();
  });

  test('renders register page', () => {
    render(<App />, { wrapper: MemoryRouter });
    userEvent.click(screen.getByRole('link', { name: /register/i }));
    expect(screen.getByRole('heading', { name: /register page/i })).toBeInTheDocument();
  });

  test('renders 404 page', () => {
    render(<App />, { wrapper: MemoryRouter });
    userEvent.click(screen.getByRole('link', { name: /404/i }));
    expect(screen.getByRole('heading', { name: /404 page not found/i })).toBeInTheDocument();
  });

  test('renders details page', () => {
    const mockPost = {
      _id: '1',
      title: 'Test Post',
      description: 'This is a test post.',
      location: 'Test Location',
      ownerName: 'Test User',
      ownerProfilePicture: 'test.jpg',
    };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({ json: () => Promise.resolve(mockPost) });
    render(<App />, { wrapper: MemoryRouter });
    userEvent.click(screen.getByRole('link', { name: /test post/i }));
    expect(screen.getByRole('heading', { name: /test post/i })).toBeInTheDocument();
    expect(screen.getByText(/test location/i)).toBeInTheDocument();
    expect(screen.getByText(/test user/i)).toBeInTheDocument();
    global.fetch.mockRestore();
  });

  test('renders create page when user is authenticated', () => {
    const mockAuth = {
      isAuthenticated: true,
      payload: 'token',
    };
    const mockUser = {
      _id: '1',
      username: 'Test User',
      profilePicture: 'test.jpg',
    };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({ json: () => Promise.resolve(mockUser) });
    render(
      <MemoryRouter initialEntries={['/create']}>
        <App />
      </MemoryRouter>,
      { wrapper: MemoryRouter }
    );
    expect(screen.getByRole('heading', { name: /create post/i })).toBeInTheDocument();
    global.fetch.mockRestore();
  });

  test('redirects to login page when user is not authenticated', () => {
    const mockAuth = {
      isAuthenticated: false,
      payload: null,
    };
    render(
      <MemoryRouter initialEntries={['/create']}>
        <App />
      </MemoryRouter>,
      { wrapper: MemoryRouter }
    );
    expect(screen.getByRole('heading', { name: /login page/i })).toBeInTheDocument();
  });
})