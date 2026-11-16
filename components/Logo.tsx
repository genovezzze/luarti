/* eslint-disable @next/next/no-img-element */
type Props = { className?: string };

/** Official LUARTI logo (public/images/LUARTI_black.svg). */
export function Logo({ className }: Props) {
  return (
    <img
      src="/images/LUARTI_black.svg"
      alt="LUARTI"
      width={1310}
      height={224}
      className={`logo ${className ?? ""}`}
    />
  );
}
