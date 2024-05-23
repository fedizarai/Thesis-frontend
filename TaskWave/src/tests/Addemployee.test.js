import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Addemployee from '../_components/modelbox/Addemployee';

describe('Addemployee Component', () => {
  it('renders Add Employee form', () => {
    render(<Addemployee />);
    expect(screen.getByText(/Add Employee/i)).toBeInTheDocument();
  });

  it('allows input of form data', () => {
    render(<Addemployee />);
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'Developer' } });
    fireEvent.change(screen.getByLabelText(/Employee ID/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'testuser1@example.com' } });
    fireEvent.change(screen.getByLabelText(/Position/i), { target: { value: 'Software Engineer' } });
    fireEvent.change(screen.getByLabelText(/Report To/i), { target: { value: 'Manager' } });
    fireEvent.change(screen.getByLabelText(/Birth Date/i), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText(/Joining Date/i), { target: { value: '2024-01-01' } });

    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('Test User');
    expect(screen.getByLabelText(/Role/i)).toHaveValue('Developer');
    expect(screen.getByLabelText(/Employee ID/i)).toHaveValue('12345');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('testuser1@example.com');
    expect(screen.getByLabelText(/Position/i)).toHaveValue('Software Engineer');
    expect(screen.getByLabelText(/Report To/i)).toHaveValue('Manager');
    expect(screen.getByLabelText(/Birth Date/i)).toHaveValue('1990-01-01');
    expect(screen.getByLabelText(/Joining Date/i)).toHaveValue('2024-01-01');
  });

  it('submits form successfully', async () => {
    render(<Addemployee />);
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'Developer' } });
    fireEvent.change(screen.getByLabelText(/Employee ID/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'testuser1@example.com' } });
    fireEvent.change(screen.getByLabelText(/Position/i), { target: { value: 'Software Engineer' } });
    fireEvent.change(screen.getByLabelText(/Report To/i), { target: { value: 'Manager' } });
    fireEvent.change(screen.getByLabelText(/Birth Date/i), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText(/Joining Date/i), { target: { value: '2024-01-01' } });
    fireEvent.click(screen.getByText(/Submit/i));

    // Mock server response or additional assertions can be added here
  });
});
