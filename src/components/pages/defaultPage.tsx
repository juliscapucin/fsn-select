import { Heading, PageWrapper } from '@/components/ui';

type DefaultPageProps = {
    title: string;
    children?: React.ReactNode;
};

export default function DefaultPage({ title, children }: DefaultPageProps) {
    return (
        <PageWrapper>
            <Heading tag='h1' variant='display' classes='mb-8 mt-32'>
                {title}
            </Heading>
            {children}
        </PageWrapper>
    );
}
