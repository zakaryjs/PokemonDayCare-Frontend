import {  render } from '@testing-library/react';
import Footer from '../components/Footer';

test('home page renders description text', () => {
  render(<Footer />);
  const footer = <Footer />

  expect(footer).toBeDefined()
});