type SpacerProps = {
    height?: '4' | '8' | '16' | '32' | '64';
};

export default function Spacer({ height = '8' }: SpacerProps) {
    return <div className={`w-full h-${height}`}></div>;
}
