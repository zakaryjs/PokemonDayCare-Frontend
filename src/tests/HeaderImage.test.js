import {  render } from '@testing-library/react';
import HeaderImage from '../components/HeaderImage';

test('home page renders description text', () => {
  render(<HeaderImage />);
  const headerImage = <HeaderImage />

  expect(headerImage).toBeDefined()
});