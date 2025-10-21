import ButtonChevron from "./buttonChevron";

interface ButtonsCarouselProps {
   tl: gsap.core.Timeline;
   itemsCount: number;
   activeCarouselImage: number;
   setActiveCarouselImage: (arg: number) => void;
}

const timingSettings = { duration: 0.3, ease: "power1.inOut" };

export default function ButtonsCarousel({
   tl,
   itemsCount,
   activeCarouselImage,
   setActiveCarouselImage,
}: ButtonsCarouselProps) {
   const buttonClasses = "flex items-center justify-center";

   return (
      <div className="relative lg:hidden mt-8 z-10">
         {/* PAGE INDICATORS */}
         <div className="w-full h-4 flex items-center *:flex-1 gap-px border-t border-b border-faded overflow-clip">
            {[...Array(itemsCount)].map((_, index) => (
               <button
                  onClick={() => {
                     tl.toIndex(index, timingSettings);
                     setActiveCarouselImage(tl.current());
                  }}
                  className={`bg-secondary w-6 transition-transform ${activeCarouselImage === index ? "opacity-100 h-full" : "h-full  opacity-10"}`}
                  key={index}
               ></button>
            ))}
         </div>

         {/* BUTTONS PREV/NEXT */}
         <div className="flex relative w-full h-16 items-center border-b border-faded *:flex-1">
            {/* BUTTON PREVIOUS */}
            <ButtonChevron
               classes={`prev-btn h-full border-r border-faded ${buttonClasses}`}
               direction="back"
               onClick={() => {
                  tl.toIndex(activeCarouselImage - 1, timingSettings);
                  setActiveCarouselImage(tl.current());
               }}
            />

            {/* BUTTON NEXT */}
            <ButtonChevron
               classes={`next-btn rotate-0 ${buttonClasses}`}
               direction="forward"
               onClick={() => {
                  tl.toIndex(activeCarouselImage + 1, timingSettings);
                  setActiveCarouselImage(tl.current());
               }}
            />
         </div>
      </div>
   );
}
