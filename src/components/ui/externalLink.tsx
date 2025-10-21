type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant: 'primary' | 'secondary';
};

export default function ExternalLink({ variant, ...props }: ExternalLinkProps) {
    return (
        <a
            className={`underlined-link text-${variant}`}
            {...props}
            target='_blank'
            rel='noopener noreferrer'
        >
            {props.children}
        </a>
    );
}
