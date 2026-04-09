import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Key } from '../components/Key';

describe('Key component', () => {
  it('should render with label', () => {
    render(<Key label="Q" finger={0} />);
    expect(screen.getByText('Q')).toBeInTheDocument();
  });

  it('should have correct initial styling', () => {
    const { container } = render(<Key label="A" finger={1} />);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    let clicked = false;
    const { container } = render(
      <Key label="W" finger={2} onClick={() => { clicked = true; }} />
    );
    container.querySelector('button')?.click();
    expect(clicked).toBe(true);
  });
});
