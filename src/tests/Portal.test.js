import { render } from '@testing-library/react';
import AccountPortal from '../pages/AccountPortal';
import LoadingCircles from '../components/spinners/Circles';
import { BrowserRouter } from 'react-router-dom';

const MockAccountPortal = () => {
    return (
        <BrowserRouter>
            <AccountPortal />
        </BrowserRouter>
    )
}

test('loading spinner is rendered on load', () => {
    render(<MockAccountPortal />)
    const loadingCircles = <LoadingCircles />

    expect(loadingCircles).toBeDefined()
})