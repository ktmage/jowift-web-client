import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TextField from './TextField';

describe('TextField', () => {
	it('renders without crashing', () => {
		render(<TextField />);
		const textField = screen.getByRole('textbox');
		expect(textField).toBeInTheDocument();
	});

	it('renders with initial value', () => {
		render(<TextField value='Initial value' />);
		const textField = screen.getByRole('textbox');
		expect(textField).toHaveValue('Initial value');
	});

	it('changes value when typing', () => {
		render(<TextField />);
		const textField = screen.getByRole('textbox');
		fireEvent.change(textField, { target: { value: 'New value' } });
		expect(textField).toHaveValue('New value');
	});

	it('applies the typography prop', () => {
		render(<TextField typography='title' />);
		const textField = screen.getByRole('textbox');
		expect(textField).toHaveClass('text-2xl font-bold');
	});
});
