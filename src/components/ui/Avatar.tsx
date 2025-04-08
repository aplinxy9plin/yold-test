import { cn } from "@/lib/utils";
import { Typography } from "./Typography";
// import Image from "next/image";

interface AvatarProps {
  size?: "mini" | "big";
  image?: string | null;
  username?: string;
  className?: string;
}

const sizeStyles = {
  mini: "w-[50px] h-[50px]",
  big: "w-[100px] h-[100px]",
};

export function Avatar({
  size = "mini",
  // image = null,
  username,
  className,
}: AvatarProps) {
  const sizeStyle = sizeStyles[size];
  const initial = username?.[0]?.toUpperCase();

  // TODO ссылки на картинки не работают
  // if (image) {
  //   return (
  //     <div className={cn(
  //       "relative rounded-full overflow-hidden bg-background-secondary border border-strokes-secondary",
  //       sizeStyle,
  //       className
  //     )}>
  //       <Image
  //         src={image}
  //         alt={username || "Avatar"}
  //         fill
  //         className="object-cover"
  //       />
  //     </div>
  //   );
  // }

  if (username) {
    return (
      <div
        className={cn(
          "rounded-full bg-background-secondary border border-strokes-secondary flex items-center justify-center",
          sizeStyle,
          className
        )}
      >
        <Typography
          variant={size === "big" ? "title" : "subtitle"}
          className="text-txt"
        >
          {initial}
        </Typography>
      </div>
    );
  }

  return null;
}
