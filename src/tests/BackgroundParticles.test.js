import {  render } from '@testing-library/react';
import BackgroundParticles from '../components/BackgroundParticles';

test('home page renders description text', () => {
  render(<BackgroundParticles />);
  const backgroundParticles = <BackgroundParticles />

  expect(backgroundParticles).toBeDefined()
});