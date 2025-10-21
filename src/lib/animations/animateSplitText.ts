import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

function createSplitText(selector: string, type: 'chars' | 'lines' | 'words') {
    const config = { type, mask: type };
    return SplitText.create(selector, config);
}

export function animateSplitText(
    selector: string,
    type: 'chars' | 'lines' | 'words',
    duration: number = 0.3,
    stagger: number = 0.025
) {
    const tl = gsap.timeline();
    const split = createSplitText(selector, type);
    tl.fromTo(
        split[type],
        {
            yPercent: 150,
        },
        {
            yPercent: 0,
            stagger,
            ease: 'power4.out',
            duration,
        }
    );

    return tl;
}
