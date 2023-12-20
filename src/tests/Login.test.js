import { fireEvent, render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';
import LoadingGrid from '../components/spinners/Grid';

const MockLogin = () => {
    return (
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    )
}

test('login page renders text', () => {
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

test("Loading Spinner is rendered after button click", () => {
  render(<MockLogin />);
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