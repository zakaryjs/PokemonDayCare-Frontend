import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import BackgroundParticles from '../components/BackgroundParticles';
import HeaderImage from '../components/HeaderImage';

test('home page renders description text', () => {
  render(<Home />);
  const line1 = screen.getByText(/We provide services that/i);
  const line2 = screen.getByText(/fit all trainers/i);
  const line3 = screen.getByText(/needs:/i);
  expect(line1).toBeInTheDocument();
  expect(line2).toBeInTheDocument();
  expect(line3).toBeInTheDocument();
});

test('home page renders background particles', () => {
  render(<Home />);
  const backgroundParticles = <BackgroundParticles />

  expect(backgroundParticles).toBeDefined()
})

test('home page renders header image', () => {
  render(<Home />);
  const headerImage = <HeaderImage />

  expect(headerImage).toBeDefined()
})

test("can click on about", () => {
  render(<Home />);
  const aboutButton = screen.getByText("About");
  

  let result = fireEvent(
    aboutButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  )

  expect(result).toBe(true)
})