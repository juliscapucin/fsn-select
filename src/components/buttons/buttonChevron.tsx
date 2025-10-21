import { IconChevron } from "@/components/icons";

interface ButtonArrowProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   classes?: string;
   direction: "forward" | "back";
}

export default function ButtonChevron({
   classes,
   direction,
   ...props
}: ButtonArrowProps) {
   return (
      <button
         className={`flex justify-center items-center opacity-100 transition-opacity duration-300 ${classes || ""}`}
         {...props}
      >
         <IconChevron direction={direction} />
      </button>
   );
}
