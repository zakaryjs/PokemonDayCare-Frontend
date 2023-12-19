import { render, screen } from '@testing-library/react';
import About from '../pages/About';

test('about page renders description text', () => {
    render(<About />);
    const line1 = screen.getByText(/The lovely Pokemon Day Care has been running for many years/i);
    const line2 = screen.getByText(/Both Grant and Martha have enjoyed every year they have spent servicing the community through caring for Pokemon/i);
    const line3 = screen.getByText(/With their strong expertise in the field of Pokemon care, there is no Pokemon that is too tough for them/i);
    const line4 = screen.getByText(/Regardless of the service you choose, be assured that you have made the right choice/i);
    expect(line1).toBeInTheDocument();
    expect(line2).toBeInTheDocument();
    expect(line3).toBeInTheDocument();
    expect(line4).toBeInTheDocument();
  });