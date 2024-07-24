import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import IconButton from './IconButton';
import SaveIcon from '@mui/icons-material/Save';

describe('IconButton', () => {
	it('renders correctly', () => {
		render(
			<IconButton>
				<SaveIcon />
			</IconButton>,
		);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('calls onClick when clicked', () => {
		const handleClick = vi.fn();
		render(
			<IconButton onClick={handleClick}>
				<SaveIcon />
			</IconButton>,
		);
		fireEvent.click(screen.getByRole('button'));
		expect(handleClick).toHaveBeenCalled();
	});

	it('is disabled when disabled prop is true', () => {
		render(
			<IconButton disabled>
				<SaveIcon />
			</IconButton>,
		);
		expect(screen.getByRole('button')).toBeDisabled();
	});
});
