import { translateCategoryAndPriority } from "@/features/taskDashboard/utils/taskUtils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./command";
import { Search } from "lucide-react";

type FilterGroup = {
  group: string;
  options: { value: string; label: string }[];
};

type FilterOption = {
  group: string;
  value: string;
};

type Props = {
  groups: FilterGroup[];
  selected: FilterOption | null;
  onChange: (option: FilterOption | null) => void;
};

export function ComboboxPopover({ groups, selected, onChange }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-70 justify-start border border-gray-300 rounded-lg text-gray-700 bg-white text-gray-500"
            aria-label="Filter Button"
          >
            {selected?.value ? (
              `Filtro: ${translateCategoryAndPriority(selected.value)}`
            ) : (
              <>
                <Search />
                Filtrar
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 border border-gray-300"
          side="bottom"
          align="start"
        >
          <Command className="bg-white">
            <CommandList>
              <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
              {groups?.map((group) => (
                <CommandGroup
                  key={group.group}
                  heading={translateCategoryAndPriority(group.group)}
                >
                  {group?.options?.map((option) => (
                    <CommandItem
                      key={`${group.group}-${option.value}`}
                      value={option.value}
                      onSelect={() => {
                        onChange({ group: group.group, ...option });
                        setOpen(false);
                      }}
                    >
                      {translateCategoryAndPriority(option.label)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
              <CommandItem
                value=""
                onSelect={() => {
                  onChange(null);
                  setOpen(false);
                }}
              >
                Remover filtro
              </CommandItem>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
