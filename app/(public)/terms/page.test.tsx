/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import TermsPage from './page';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, animate, initial, transition, whileHover, whileInView, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

describe('TermsPage', () => {
  it('renders the page title', () => {
    render(<TermsPage />);
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });

  it('renders the last updated date', () => {
    render(<TermsPage />);
    expect(screen.getByText('Last Updated: January 2026')).toBeInTheDocument();
  });

  it('renders terms sections', () => {
    render(<TermsPage />);
    expect(screen.getByText('1. Acceptance of Terms')).toBeInTheDocument();
    expect(screen.getByText('2. Purpose of the Platform')).toBeInTheDocument();
    expect(screen.getByText('3. User Responsibilities')).toBeInTheDocument();
  });
});