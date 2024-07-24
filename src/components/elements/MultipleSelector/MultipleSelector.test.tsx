import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import MultipleSelector from './MultipleSelector';

describe('Autocomplete', () => {
	it('renders correctly', () => {
		render(
			<MultipleSelector
				options={[]}
				value={[]}
				placeholder='Select...'
				onChange={() => {}}
			/>,
		);
		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});
});
