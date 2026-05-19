import Link from "next/link";

export function SubItem({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium text-black/70 transition-all duration-200 hover:bg-black/4 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10"
      role="menuitem"
      style={{ textDecoration: "none" }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-black/20 transition-all duration-300 group-hover:bg-black/50 group-hover:scale-125"
        aria-hidden="true"
      />
      {label}
    </Link>
  );
}
