import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Vender from './Vender';
import { IntlProvider } from 'react-intl';
import messages from '../localizacion/EN.json';

function renderWithProviders(ui) {
    return render(
        <BrowserRouter>
            <IntlProvider locale="en" messages={messages}>
                {ui}
            </IntlProvider>
        </BrowserRouter>
    );
}

describe('Vender component', () => {
    test('renders login form when user is not logged in', () => {
        renderWithProviders(<Vender />);
        expect(screen.getByPlaceholderText(/usuario/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    });

    test('shows error when login with empty credentials', () => {
        renderWithProviders(<Vender />);
        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
        expect(screen.getByText(/login.error/i)).toBeInTheDocument();
    });

    test('shows error on wrong credentials', () => {
        renderWithProviders(<Vender />);
        fireEvent.change(screen.getByPlaceholderText(/usuario/i), {
            target: { value: 'wronguser' },
        });
        fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
            target: { value: 'wrongpass' },
        });
        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
        expect(screen.getByText(/login.error/i)).toBeInTheDocument();
    });

    test('logs in with correct credentials and displays menu', () => {
        renderWithProviders(<Vender />);
        fireEvent.change(screen.getByPlaceholderText(/usuario/i), {
            target: { value: 'admin' },
        });
        fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
            target: { value: '123456' },
        });
        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        expect(screen.getByText(/¡Bienvenido/i)).toBeInTheDocument();
        expect(screen.getByText(/cerrar sesión/i)).toBeInTheDocument();
    });

    test('shows ProductosVendidos component on button click', () => {
        renderWithProviders(<Vender />);
        fireEvent.change(screen.getByPlaceholderText(/usuario/i), {
            target: { value: 'admin' },
        });
        fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
            target: { value: '123456' },
        });
        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        const productosButton = screen.getByRole('button', {
            name: /productos que ya se estan vendiendo/i,
        });
        fireEvent.click(productosButton);

        // Asume que ProductosVendidos tiene un texto identificador
        expect(screen.getByText(/productos vendidos/i)).toBeInTheDocument();
    });
});
