'use client';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    classes?: string;
    children: React.ReactNode;
    variant?: 'underlined' | 'solid' | 'ghost';
};

const Button = ({ classes, children, ...props }: ButtonProps) => {
    const variantClass = {
        underlined: 'underlined-link',
        solid: 'btn-solid',
        ghost: 'btn-ghost',
        blank: 'hover:opacity-80 transition-all will-change duration-500',
    }[props.variant || 'blank'];

    return (
        <button
            className={`pointer-events-auto ${variantClass || ''} ${classes || ''}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
