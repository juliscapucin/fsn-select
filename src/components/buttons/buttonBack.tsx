"use client";

import { useRouter } from "next/navigation";

import { transitionOnClickBack } from "@/lib/animations";
import { CustomButton } from "@/components/ui";
import { IconChevron } from "../icons";

type ButtonBackProps = {
   slug: string;
};

export default function ButtonBack({ slug }: ButtonBackProps) {
   const router = useRouter();

   return (
      <CustomButton
         classes="absolute h-8 mt-4 mb-8 flex gap-4 items-center border-b border-faded w-full pl-4 lg:pl-8 pb-4 bg-primary z-15"
         transitionOnClick={() =>
            transitionOnClickBack(() => router.push(`/${slug}`))
         }
      >
         <IconChevron direction="back" />
         <span className="underlined-link">
            Back to {slug.charAt(0).toUpperCase() + slug.slice(1)}
         </span>
      </CustomButton>
   );
}
