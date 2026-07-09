/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import PrivacyPage from './page';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, animate, initial, transition, whileHover, whileInView, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

describe('PrivacyPage', () => {
  it('renders the page title', () => {
    render(<PrivacyPage />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('renders the last updated date', () => {
    render(<PrivacyPage />);
    expect(screen.getByText('Last Updated: January 2026')).toBeInTheDocument();
  });

  it('renders privacy sections', () => {
    render(<PrivacyPage />);
    expect(screen.getByText('1. Data Collection')).toBeInTheDocument();
    expect(screen.getByText('2. Purpose of Collection')).toBeInTheDocument();
    expect(screen.getByText('3. Data Protection Compliance')).toBeInTheDocument();
  });
});