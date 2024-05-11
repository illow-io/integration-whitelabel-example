'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  SparklesIcon,
  TicketIcon,
} from "@heroicons/react/outline";
import { useState } from "react";

const options = [
  {
    label: 'Dashboard',
    icon: LightningBoltIcon,
    link: '/',
  },
  {
    label: 'Requests',
    icon: TicketIcon,
    link: '/requests',
  },
  {
    label: 'Forms',
    icon: DocumentTextIcon,
    link: '/forms',
  },
  {
    label: 'Data Mapping',
    icon: SparklesIcon,
    link: '/data-mapping',
  },
  {
    label: 'Consent Manager',
    icon: GlobeAltIcon,
    link: '/consent-manager',
  },
];

export default function LeftNavigationPanel({ className }: { className?: string; }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const ExpandIcon = open ? ChevronDoubleLeftIcon : ChevronDoubleRightIcon;
  return (
    <div className={`flex flex-col border-r bg-gradient-to-b from-gray-800 to-gray-900 border-gray-600 ${open ? 'w-[201px]' : 'w-[60px]'} overflow-hidden transition-all duration-100 ease-out ${className}`}>
      <ul className="flex-1 space-y-5 w-[203px] p-5">
        {options.map((option) => (
          <li key={option.label}>
            <Link className={`flex items-center justify-start flex-nowrap cursor-pointer text-sm hover:text-primary-600 ${pathname === option.link ? 'text-primary-600' : 'text-white'}`} href={option.link}>
              <option.icon className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span className={`ml-3 transition-all ${open ? 'opacity-100' : 'opacity-0'}`}>{option.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-end border-t border-gray-600 p-5">
        <ExpandIcon className="w-4 h-4 cursor-pointer text-white hover:text-primary-600" onClick={() => setOpen((prev) => !prev)} aria-hidden="true" />
      </div>
    </div>
  );
}