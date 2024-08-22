import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react';
import { CalendarFoldIcon, CaseLowerIcon, HashIcon, SquareCheckBigIcon } from 'lucide-react';
import React, { useState } from 'react';

type CustomField = {
  id: number;
  type: 'number' | 'text-multiple' | 'checkbox' | 'date';
  label: string;
};

export const CustomFields = () => {
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [nextId, setNextId] = useState<number>(1);

  const addCustomField = (key: React.Key) => {
    let newField: CustomField;

    switch (key) {
      case 'number':
        newField = { id: nextId, type: 'number', label: 'Insert name of your Number Field' };
        break;
      case 'text-multiple':
        newField = { id: nextId, type: 'text-multiple', label: 'Insert name of your Text Field' };
        break;
      case 'checkbox':
        newField = { id: nextId, type: 'checkbox', label: 'Insert name of your Checkbox Field' };
        break;
      case 'date':
        newField = { id: nextId, type: 'date', label: 'Insert name of your Date Field' };
        break;
      default:
        return;
    }

    setCustomFields([...customFields, newField]);
    setNextId(nextId + 1);
  };

  return (
    <div className="space-y-4">
      <Dropdown>
        <DropdownTrigger>
          <Button className="w-full" variant="bordered">
            Add Custom Field
          </Button>
        </DropdownTrigger>
        <DropdownMenu onAction={(key) => addCustomField(key)} aria-label="Static Actions">
          <DropdownItem startContent={<HashIcon />} key="number">
            Number Field
          </DropdownItem>
          <DropdownItem startContent={<CaseLowerIcon />} key="text-multiple">
            Text Field
          </DropdownItem>
          <DropdownItem startContent={<SquareCheckBigIcon />} key="checkbox">
            Checkbox Field
          </DropdownItem>
          <DropdownItem startContent={<CalendarFoldIcon />} key="date">
            Date Field
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {customFields.map((field) => (
        <Input key={field.id} label={field.label} />
      ))}
    </div>
  );
};
