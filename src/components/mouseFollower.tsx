'use client';

import { useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Observer } from 'gsap/Observer';
gsap.registerPlugin(Observer);

import { IconChevron } from '@/components/icons';

type MouseFollowerProps = {
    variant: 'big' | 'small';
    isVisible?: boolean;
    children?: React.ReactNode;
};

export default function MouseFollower({
    variant,
    isVisible,
    children,
}: MouseFollowerProps) {
    const cursorRef = useRef<HTMLDivElement | null>(null);

    // Mouse follower movement
    useGSAP(() => {
        const cursorDiv = cursorRef.current;
        if (!cursorDiv || !cursorDiv.parentElement) return;

        gsap.set(cursorDiv, { xPercent: -50, yPercent: -50 });

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursorDiv, {
                x: e.clientX,
                y: e.clientY,
                duration: 1,
            });
        };

        const parent = cursorDiv.parentElement;
        parent.addEventListener('mousemove', moveCursor);

        return () => {
            parent.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    useGSAP(() => {
        const cursorDiv = cursorRef.current;
        if (!cursorDiv) return;

        gsap.to(cursorDiv, { opacity: isVisible ? 1 : 0, duration: 0.3 });
    }, [isVisible]);

    return (
        <div
            ref={cursorRef}
            className={`pointer-events-none fixed top-0 left-0 z-15 flex items-center justify-center rounded-full border border-secondary/50 bg-primary/30 ${variant === 'big' ? 'h-40 w-40' : 'h-24 w-24'}`}
        >
            {children ? (
                children
            ) : (
                <div className='flex items-center gap-8'>
                    <IconChevron direction='back' />
                    <span
                        className={`${
                            variant === 'big'
                                ? 'text-title-large font-extralight'
                                : 'text-label-large text-secondary'
                        }`}
                    >
                        SCROLL
                    </span>
                    <IconChevron direction='forward' />
                </div>
            )}
        </div>
    );
}
