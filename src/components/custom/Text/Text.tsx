import { cn } from "@/lib/utils";
import { FC } from "react";

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {}

const Title: FC<TextProps> = ({ children, className = "", ...props }) => {
  return (
    <h1 className={cn('font-bold text-4xl', className)} {...props}>
      {children}
    </h1>
  );
};

const Subtitle: FC<TextProps> = ({ children, className = "", ...props }) => {
  return (
    <h2 className={cn('font-bold text-2xl', className)} {...props}>
      {children}
    </h2>
  );
};

const Paragraph: FC<TextProps> = ({ children, className = "", ...props }) => {
  return (
    <p className={cn('text-base', className)} {...props}>
      {children}
    </p>
  );
};

const SmallText: FC<TextProps> = ({ children, className = "", ...props }) => {
  return (
    <span className={cn('text-sm', className)} {...props}>
      {children}
    </span>
  );
};

export const Text = {
  Title,
  Subtitle,
  Paragraph,
  SmallText,
};
