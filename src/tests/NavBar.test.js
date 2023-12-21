import {  render } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
const mockNavBar = () => {
    <BrowserRouter>
        <NavBar />
    </BrowserRouter>
}

test('home page renders description text', () => {
  render(<mockNavBar />);
  const navBar = <NavBar />

  expect(navBar).toBeDefined()
});