import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Autocomplete from './Autocomplete';

describe('Autocomplete', () => {
	it('renders correctly', () => {
		render(<Autocomplete />);
		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});
});
