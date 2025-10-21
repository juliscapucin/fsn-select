"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

type ButtonRoundedProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
   React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      classes?: string;
      children?: React.ReactNode;
   };

export default function ButtonRounded({
   classes,
   children,
   ...props
}: ButtonRoundedProps) {
   const { onClick, href, target } = props;
   const maskRef = useRef(null);

   const [isHovered, setIsHovered] = useState(false);

   const sharedStyles =
      "text-body-medium lg:text-body-large uppercase rounded-full border border-secondary px-4 py-2";
   const buttonStyles = "inline-block";
   const overlayStyles = "bg-secondary text-primary pointer-events-none";

   useEffect(() => {
      if (!maskRef.current) return;

      const clipValue = isHovered
         ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
         : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";

      gsap.to(maskRef.current, {
         clipPath: clipValue,
         duration: 0.4,
         ease: "power4.out",
      });
   }, [isHovered]);

   return (
      <div className={`relative overflow-clip w-fit ${classes || ""}`}>
         {/* Overlay */}
         <div
            ref={maskRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
            style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }} // mask's initial state
         >
            <div
               className={`${sharedStyles} ${overlayStyles} ${classes || ""}`}
            >
               {children}
            </div>
         </div>
         {/* Button */}
         {href ? (
            <a
               href={href}
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
               target={target ? target : "_self"}
               className={`${sharedStyles} ${buttonStyles} ${classes || ""}`}
            >
               {children}
            </a>
         ) : (
            <button
               onClick={onClick}
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
               className={`${sharedStyles} ${buttonStyles} ${classes || ""}`}
            >
               {children}
            </button>
         )}
      </div>
   );
}
