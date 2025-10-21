type ParagraphFeatureProps = React.HTMLAttributes<HTMLParagraphElement> & {
    classes?: string;
    children: React.ReactNode;
    variant: 'title' | 'body' | 'label';
    font?: 'primary' | 'secondary';
};

export default function ParagraphFeature({
    classes,
    children,
    variant,
    font,
    ...props
}: ParagraphFeatureProps) {
    let paragraphFeatureStyles = '';

    switch (variant) {
        case 'title':
            paragraphFeatureStyles =
                'text-title-small md:text-title-medium lg:text-title-large font-medium';
            break;
        case 'body':
            paragraphFeatureStyles =
                'text-body-small md:text-body-medium lg:text-body-large font-medium';
            break;
        case 'label':
            paragraphFeatureStyles =
                'text-label-small md:text-label-medium lg:text-label-large';
            break;
        default:
            paragraphFeatureStyles =
                'text-display-small md:text-display-medium lg:text-display-large';
            break;
    }

    return (
        <p
            className={`${
                classes ? classes : ''
            } ${paragraphFeatureStyles} ${font ? `font-${font}` : 'font-secondary'} mx-auto my-16 max-w-prose text-center leading-normal font-medium tracking-normal text-pretty`}
            {...props}
        >
            {children}
        </p>
    );
}
