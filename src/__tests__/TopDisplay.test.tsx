import { render, screen } from '@testing-library/react';
import TopDisplay from '@/app/Components/TopDisplay/TopDisplay';
import { useUIState } from '@/context/UIStateProvider';

// Mocka useUIState hooken för att ge ett testvärde
jest.mock('@/context/UIStateProvider', () => ({
  useUIState: jest.fn(),
}));

describe('TopDisplay Component', () => {
  it('renders correctly with selectedFilter', () => {
    // Mocka att selectedFilter är "Vegetarian"
    (useUIState as jest.Mock).mockReturnValue({ selectedFilter: 'Vegetarian' });

    render(<TopDisplay />);

    // Kontrollera att "Vegetarian" visas
    expect(screen.getByText('Vegetarian')).toBeInTheDocument();
    // Kontrollera att "PizzaLover" alltid visas
    expect(screen.getByText('PizzaLover')).toBeInTheDocument();
  });
});
