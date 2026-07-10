import React from 'react';

// Light-weight standalone SVG path declarations to avoid Webpack SVG file-loader dependency
const ICONS = {
  Default: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
  Globe: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  ),
  Graph: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
  ),
  Table: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 10.02h5V21h-5V10.02zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-16h-3V3h3c1.1 0 2 .9 2 2v3h-5V5zm-8-2h5v5h-5V3zm-2 7.02H3v9c0 1.1.9 2 2 2h5V10.02zM5 3h5v5H3V5c0-1.1.9-2 2-2z" />
    </svg>
  ),
  'Arrow Right': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  ),
  External: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
    </svg>
  ),
};

export type IconType = keyof typeof ICONS;

interface Props {
  icon: IconType;
  size?: string;
  color?: string;
  inline?: boolean;
  style?: React.CSSProperties;
}

export const Icon: React.FC<Props> = (props) => {
  const { icon, size = '1em', color, inline, style } = props;

  const component = ICONS[icon] || ICONS.Default;

  return (
    <span
      style={{
        display: inline ? 'inline-inline' : 'inline-block',
        width: size,
        height: size,
        color: color,
        verticalAlign: inline ? 'middle' : 'inherit',
        lineHeight: 0,
        ...style,
      }}
    >
      {component}
    </span>
  );
};
