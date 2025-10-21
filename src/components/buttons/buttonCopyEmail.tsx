'use client';

import { useState, useRef } from 'react';

export default function ButtonCopyEmail() {
    const [showCopyFeedback, setShowCopyFeedback] = useState(false);
    const labelRef = useRef(null);

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText('hello@juliscapucin.com')
            .then(() => {
                setShowCopyFeedback(true);
                setTimeout(() => setShowCopyFeedback(false), 2000);
            })
            .catch((err) => {
                console.error('Failed to copy email address: ', err);
            });
    };

    return (
        <div className='relative mt-2 flex flex-col items-center justify-center'>
            <div
                ref={labelRef}
                className='relative flex h-4 w-fit items-center justify-center overflow-clip'
            >
                <span
                    className={`text-label-small transition-transform duration-150 ${showCopyFeedback ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    Copied to clipboard!
                </span>
            </div>

            <button
                className='group h-6 cursor-pointer overflow-clip'
                onClick={copyToClipboard}
            >
                <div className='flex flex-col text-label-large uppercase transition-transform duration-200 group-hover:-translate-y-1/2'>
                    <span>copy email address</span>
                    <span>copy email address</span>
                </div>
            </button>
        </div>
    );
}
