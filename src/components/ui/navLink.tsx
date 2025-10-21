'use client';

import { usePathname } from 'next/navigation';

import { CustomButton } from '@/components/ui';

type NavLinkProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    classes?: string;
    variant: 'primary' | 'secondary';
};

export default function NavLink({
    label,
    variant,
    classes,
    ...props
}: NavLinkProps) {
    const pathname = usePathname();

    return (
        <li className='max-h-8 overflow-clip'>
            <CustomButton
                classes={`text-title-small md:text-title-medium disabled:pointer-events-none text-${variant} disabled:text-secondary ${classes}`}
                disabled={
                    pathname.includes(label.toLowerCase()) || props.disabled
                }
                {...props}
            >
                {label}
            </CustomButton>
        </li>
    );
}
