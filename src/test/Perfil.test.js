import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import Perfil from './Perfil';
import messages from '../localizacion/EN.json';

jest.mock('../components/HU04', () => () => <div>HU04 Component</div>);
jest.mock('../components/HU10', () => () => <div>HU10 Component</div>);

const renderWithIntl = (ui) => {
    return render(
        <IntlProvider locale="en" messages={messages}>
            {ui}
        </IntlProvider>
    );
};

    describe('Perfil Component', () => {
    test('renders profile title and form fields', () => {
        renderWithIntl(<Perfil />);
        expect(screen.getByText(/profile/i)).toBeInTheDocument(); // Assuming perfil.titulo = "Profile"

        expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/phone/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/venture/i)).toBeInTheDocument();
    });

    test('updates form fields on input', () => {
        renderWithIntl(<Perfil />);
        const nameInput = screen.getByPlaceholderText(/name/i);
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        expect(nameInput.value).toBe('John Doe');
    });

    test('renders HU04 in comprar mode by default', () => {
        renderWithIntl(<Perfil />);
        expect(screen.getByText(/HU04 Component/i)).toBeInTheDocument();
    });

    test('renders FavoritosVender and HU10 when mode is changed to vender', () => {
        renderWithIntl(<Perfil />);
        const dropdown = screen.getByRole('combobox');
        fireEvent.change(dropdown, { target: { value: 'vender' } });

        expect(screen.getByText(/Stand 10 UD Calle 40/i)).toBeInTheDocument();
        expect(screen.getByText(/HU10 Component/i)).toBeInTheDocument();
    });
    });
