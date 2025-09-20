import { cn } from "@/lib/utils";
import React from "react";

type ResponsiveSectionProps = React.HTMLAttributes<HTMLDivElement>;

const ResponsiveSection: React.FC<ResponsiveSectionProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "w-full sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1200px] px-2 sm:px-8 lg:px-10 py-4 sm:py-6 lg:py-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ResponsiveSection;