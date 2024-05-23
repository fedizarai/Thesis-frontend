import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Editproject from '../_components/modelbox/Editproject';

describe('Editproject Component', () => {
  it('renders Edit Project form', () => {
    render(<Editproject projectId={1} />);
    expect(screen.getByText(/Edit Project/i)).toBeInTheDocument();
  });

  it('allows input of form data', () => {
    render(<Editproject projectId={1} />);
    fireEvent.change(screen.getByLabelText(/Project Name/i), { target: { value: 'Test Project' } });
    fireEvent.change(screen.getByLabelText(/Working Hours/i), { target: { value: '40' } });
    fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 'High' } });
    fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'In Progress' } });
    fireEvent.change(screen.getByLabelText(/Created by/i), { target: { value: 'Manager' } });
    fireEvent.change(screen.getByLabelText(/Project Leader/i), { target: { value: 'Team Leader' } });

    expect(screen.getByLabelText(/Project Name/i)).toHaveValue('Test Project');
    expect(screen.getByLabelText(/Working Hours/i)).toHaveValue('40');
    expect(screen.getByLabelText(/Priority/i)).toHaveValue('High');
    expect(screen.getByLabelText(/Status/i)).toHaveValue('In Progress');
    expect(screen.getByLabelText(/Created by/i)).toHaveValue('Manager');
    expect(screen.getByLabelText(/Project Leader/i)).toHaveValue('Team Leader');
  });

  it('submits form successfully', async () => {
    render(<Editproject projectId={1} />);
    fireEvent.change(screen.getByLabelText(/Project Name/i), { target: { value: 'Test Project' } });
    fireEvent.change(screen.getByLabelText(/Working Hours/i), { target: { value: '40' } });
    fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 'High' } });
    fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'In Progress' } });
    fireEvent.change(screen.getByLabelText(/Created by/i), { target: { value: 'Manager' } });
    fireEvent.change(screen.getByLabelText(/Project Leader/i), { target: { value: 'Team Leader' } });
    fireEvent.click(screen.getByText(/Submit/i));

    // Mock server response or additional assertions can be added here
  });
});
