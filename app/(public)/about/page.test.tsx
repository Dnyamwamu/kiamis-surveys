/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import FertilizerPage from './page';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, animate, initial, transition, whileHover, ...props }: any) => <div {...props}>{children}</div>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

// Mock @heroicons/react/20/solid
jest.mock('@heroicons/react/20/solid', () => ({
  CloudArrowUpIcon: () => <div data-testid="cloud-arrow-up-icon" />,
  LockClosedIcon: () => <div data-testid="lock-closed-icon" />,
  ServerIcon: () => <div data-testid="server-icon" />,
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  CheckCircle2: () => <div data-testid="check-circle-icon" />,
  Zap: () => <div data-testid="zap-icon" />,
  Target: () => <div data-testid="target-icon" />,
  ShieldCheck: () => <div data-testid="shield-check-icon" />,
  BarChart3: () => <div data-testid="bar-chart-icon" />,
  Users2: () => <div data-testid="users-icon" />,
  TractorIcon: () => <div data-testid="tractor-icon" />,
  Ticket: () => <div data-testid="ticket-icon" />,
  Globe: () => <div data-testid="globe-icon" />,
  Package: () => <div data-testid="package-icon" />,
}));

// Mock components
jest.mock('@/components/public/KiamisImpactAccordion', () => ({
  KiamisImpactAccordion: () => <div data-testid="kiamis-impact-accordion" />,
}));

jest.mock('@/components/public/dynamic-image-grid', () => ({
  DynamicImageGrid: () => <div data-testid="dynamic-image-grid" />,
}));

jest.mock('@/components/public/dynamic-image-grid-reverse', () => ({
  DynamicImageGridReverse: () => <div data-testid="dynamic-image-grid-reverse" />,
}));

describe('FertilizerPage', () => {
  it('renders the hero section with correct heading', () => {
    render(<FertilizerPage />);
    expect(screen.getByText('National Fertilizer Subsidy Program')).toBeInTheDocument();
  });

  it('renders the stats section', () => {
    render(<FertilizerPage />);
    expect(screen.getByText('7.4M+')).toBeInTheDocument();
    expect(screen.getByText('Farmers Registered')).toBeInTheDocument();
    expect(screen.getByText('1.8M+')).toBeInTheDocument();
    expect(screen.getByText('Beneficiaries')).toBeInTheDocument();
    expect(screen.getByText('47')).toBeInTheDocument();
    expect(screen.getByText('Counties Covered')).toBeInTheDocument();
  });

  it('renders the impact accordion', () => {
    render(<FertilizerPage />);
    expect(screen.getByTestId('kiamis-impact-accordion')).toBeInTheDocument();
  });

  it('renders the dynamic image grids', () => {
    render(<FertilizerPage />);
    expect(screen.getByTestId('dynamic-image-grid')).toBeInTheDocument();
    expect(screen.getByTestId('dynamic-image-grid-reverse')).toBeInTheDocument();
  });
});