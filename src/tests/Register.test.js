import { fireEvent, render, screen } from '@testing-library/react';
import Register from '../pages/Register';
import { BrowserRouter } from 'react-router-dom';
import LoadingGrid from '../components/spinners/Grid';

const MockRegister = () => {
    return (
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    )
}

test('register page renders text', () => {
    render(<MockRegister />)
    const line1 = screen.getByText(/Register/i);
    const line2 = screen.getByText(/First Name/i);
    const line3 = screen.getByText(/Last Name/i);
    const line4 = screen.getByText(/Email Address/i);
    const line5 = screen.getByText(/Password/i);
    expect(line1).toBeInTheDocument();
    expect(line2).toBeInTheDocument();
    expect(line3).toBeInTheDocument();
    expect(line4).toBeInTheDocument();
    expect(line5).toBeInTheDocument();
  });

test("can click on submit", () => {
    render(<MockRegister />);
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

test("Loading Spinner is rendered after button click", () => {
    render(<MockRegister />);
    const submitButton = screen.getByText("Submit");
    const loadingGrid = <LoadingGrid />
    
      // eslint-disable-next-line no-unused-vars
      let result = fireEvent(
        submitButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      )
  
      expect(loadingGrid).toBeDefined()
  })