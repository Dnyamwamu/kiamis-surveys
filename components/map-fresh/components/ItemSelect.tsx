'use client';

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Select } from './Select';

interface Item {
  id: string;
  name: string;
}

interface Props {
  items: Item[];
  onChange?: (value: string) => void;
}

export const ItemSelect: React.FC<Props> = (props) => {
  const { items, onChange } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedItem = searchParams?.get('item') ?? '';

  if (!items || items.length === 0) {
    return null;
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;

    if (onChange) {
      onChange(value);
      return;
    }

    // Default: update query parameter 'item' dynamically using Next.js router
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    if (value === '') {
      params.delete('item');
    } else {
      params.set('item', value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      value={selectedItem}
      onChange={handleSelectChange}
      secondary
      style={{ minWidth: '140px', backgroundColor: '#cde5c8' }}
    >
      <option value="">All items</option>
      {items.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Select>
  );
};
