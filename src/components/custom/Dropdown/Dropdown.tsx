import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

type TProps = {
  items: {
    label: string,
    onClick: () => void,
  }[],
}

export const Dropdown = ({ items }: TProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost">
          <Image src="/options.png" alt="options icon" width={20} height={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map(({ label, onClick }, index) => (
          <DropdownMenuItem key={index + label} onClick={onClick}>{label}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
