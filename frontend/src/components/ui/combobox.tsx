"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { translateCategoryAndPriority } from "@/features/taskDashboard/utils/taskUtils"

type FilterGroup = {
  group: string
  options: { value: string; label: string }[]
}

type FilterOption = {
  group: string
  value: string
  label: string
}

type Props = {
  groups: FilterGroup[]
  selected: FilterOption | null
  onChange: (option: FilterOption | null) => void
}

export function ComboboxPopover({ groups, selected, onChange }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[200px] justify-start border border-gray-300 rounded-lg text-gray-700 bg-white text-gray-500" >
            {selected ? `Filtro: ${translateCategoryAndPriority( selected.label)}` : <> Filtrar</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start" >
          <Command className="bg-white">
            <CommandInput placeholder="Filtrar..." />
            <CommandList>
              <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.group} heading={translateCategoryAndPriority(group.group)}>
                  {group.options.map((option) => (
                    <CommandItem
                      key={`${group.group}-${option.value}`}
                      value={option.value}
                      onSelect={() => {
                        onChange({ group: group.group, ...option })
                        setOpen(false)
                      }}
                    >
                      {translateCategoryAndPriority( option.label)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
