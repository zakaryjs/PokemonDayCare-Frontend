import { fireEvent, render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';

const MockLogin = () => {
    return (
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    )
}

test('about page renders description text', () => {
    render(<MockLogin />)
    const line1 = screen.getByText(/Login/i);
    const line2 = screen.getByText(/Email Address/i);
    const line3 = screen.getByText(/Password/i);
    expect(line1).toBeInTheDocument();
    expect(line2).toBeInTheDocument();
    expect(line3).toBeInTheDocument();
  });

  test("can click on submit", () => {
    render(<MockLogin />);
    const submitButton = screen.getByText("Submit");
  
    let result = fireEvent(
      submitButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    )
  
    expect(result).toBe(true)
  })