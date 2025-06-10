import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import LoginPage from './LoginPage';
import messages from '../localizacion/EN.json';

const renderWithProviders = (ui, { route = '/' } = {}) => {
    const history = createMemoryHistory({ initialEntries: [route] });
    return {
        ...render(
            <IntlProvider locale="en" messages={messages}>
                <Router location={history.location} navigator={history}>
                    {ui}
                </Router>
            </IntlProvider>
        ),
        history,
    };
};

describe('LoginPage component', () => {
    test('renders login form initially', () => {
        renderWithProviders(<LoginPage />);
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    });

    test('switches to register form', () => {
        renderWithProviders(<LoginPage />);
        fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));
        expect(screen.getByPlaceholderText(/nombre/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument();
    });

    test('shows error message on login failure', () => {
        renderWithProviders(<LoginPage />);
        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: 'wrong' },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: 'wrong' },
        });
        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
        expect(screen.getByText(/login.error/i)).toBeInTheDocument();
    });

    test('logs in with correct credentials and redirects', async () => {
        const { history } = renderWithProviders(<LoginPage />);
        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: 'admin' },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: '123456' },
        });
        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        expect(await screen.findByText(/login.success/i)).toBeInTheDocument();
        await waitFor(() => {
            expect(history.location.pathname).toBe('/');
        });
    });

    test('registers new user with valid data', async () => {
        renderWithProviders(<LoginPage />);
        fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

        fireEvent.change(screen.getByPlaceholderText(/nombre/i), {
            target: { value: 'Nuevo Usuario' },
        });
        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: 'nuevo@usuario.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
            target: { value: 'nuevapass' },
        });

        fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));
        expect(await screen.findByText(/register.success/i)).toBeInTheDocument();
    });

    test('shows error on empty registration form', () => {
        renderWithProviders(<LoginPage />);
        fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));
        fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));
        expect(screen.getByText(/register.error/i)).toBeInTheDocument();
    });
});
