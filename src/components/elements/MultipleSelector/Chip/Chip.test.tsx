import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Chip from './Chip';

describe('Chip', () => {
	it('renders correctly', () => {
		render(
			<Chip
				label='Chip'
				onDelete={() => {}}
			/>,
		);
		expect(screen.getByText('Chip')).toBeInTheDocument();
	});
});
