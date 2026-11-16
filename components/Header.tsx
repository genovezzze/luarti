"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { Logo } from "./Logo";
import { Close, Menu } from "./Icons";

type Props = { locale: Locale; dict: Dict["nav"] };

export function Header({ locale, dict }: Props) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const home = `/${locale}`;
  const links = [
    { href: `${home}/services`, label: dict.services },
    { href: `${home}/work`, label: dict.work },
    { href: `${home}#approach`, label: dict.approach },
    { href: `${home}#pricing`, label: dict.pricing },
    { href: `${home}/about`, label: dict.about },
    { href: `${home}/contact`, label: dict.contact },
  ];

  const switchTo = (l: Locale) => pathname.replace(/^\/(en|lv)(?=\/|$)/, `/${l}`);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="container header__inner">
        <Link href={home} className="header__logo" aria-label="LUARTI">
          <Logo />
        </Link>

        <nav className="header__nav" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </nav>

        <div className="header__right">
          <div className="lang" role="group" aria-label="Language">
            {locales.map((l) => (
              <Link
                key={l}
                href={switchTo(l)}
                className={l === locale ? "is-active" : ""}
                aria-current={l === locale ? "true" : undefined}
                hrefLang={l}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <Link href={`${home}/contact`} className="btn btn--dark btn--sm header__cta">
            {dict.cta}
          </Link>
          <button
            className="header__burger"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? dict.close : dict.menu}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div className="mobile-nav" hidden={!open}>
        <nav className="container" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <div className="lang lang--menu" role="group" aria-label="Language">
            {locales.map((l) => (
              <Link key={l} href={switchTo(l)} className={l === locale ? "is-active" : ""} hrefLang={l}>
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <Link href={`${home}/contact`} className="btn btn--dark" onClick={() => setOpen(false)}>
            {dict.cta}
          </Link>
        </nav>
      </div>
    </header>
  );
}
