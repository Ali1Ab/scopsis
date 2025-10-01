"use client";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
}

export function Button({
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...props
}: PropsWithChildren<ButtonProps>) {
    const base =
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 disabled:opacity-50 disabled:pointer-events-none";
    const variants: Record<Variant, string> = {
        primary:
            "bg-foreground text-background hover:opacity-90",
        secondary:
            "border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10",
        ghost:
            "hover:bg-black/5 dark:hover:bg-white/10",
    };
    const sizes: Record<Size, string> = {
        sm: "h-8 px-2 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
    };

    return (
        <button className={`${base} ${variants[variant]} ${sizes[size]} ${className} cursor-pointer`} {...props}>
            {children}
        </button>
    );
}


