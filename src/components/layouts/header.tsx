"use client";

import { navigation } from "@/constants/header-navigations";
import { IconChevron } from "@/icons/icon-chevron";
import { IconClose } from "@/icons/icon-close";
import { IconMenu } from "@/icons/icon-menu";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SubItem } from "../ui/header-subitem";
import { AnimatedLogo } from "../ui/animated-logo";

const MOBILE_MENU_ID = "header-mobile-menu";
const HEADER_MIN_HEIGHT_REM = 4.5;
const HEADER_VERTICAL_PADDING_REM = 1;
const MOBILE_SCROLL_THRESHOLD = 8;

const getMenuId = (label: string, variant: "desktop" | "mobile") =>
  `header-menu-${variant}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

/* ─── Main Header ────────────────────────────────────────────────── */
const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileScrolled, setMobileScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let frameId: number | null = null;
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const handlePointerDown = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setActiveMenu(null);
        setMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setMobileMenuOpen(false);
      }
    };

    const syncScrollState = () => {
      if (desktopQuery.matches) {
        const next = Math.min(window.scrollY / 140, 1);
        setScrollProgress((current) =>
          Math.abs(current - next) < 0.01 ? current : next,
        );
        return;
      }

      setScrollProgress((current) => (current === 0 ? current : 0));
      setMobileScrolled((current) => {
        const next = window.scrollY > MOBILE_SCROLL_THRESHOLD;
        return current === next ? current : next;
      });
    };

    const scheduleSync = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        setIsDesktop(desktopQuery.matches);
        syncScrollState();
        frameId = null;
      });
    };

    const handleScroll = () => {
      scheduleSync();
    };

    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setActiveMenu(null);
        setMobileMenuOpen(false);
      }
      scheduleSync();
    };

    scheduleSync();
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", handleScroll, { passive: true });
    desktopQuery.addEventListener("change", handleDesktopChange);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", handleScroll);
      desktopQuery.removeEventListener("change", handleDesktopChange);
    };
  }, []);

  useEffect(() => {
    const { style } = document.body;
    const previousOverflow = style.overflow;

    style.overflow = mobileMenuOpen ? "hidden" : previousOverflow;

    return () => {
      style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const toggleMenu = (label: string) =>
    setActiveMenu((c) => (c === label ? null : label));

  const closeMenus = () => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
  };

  const e = 1 - Math.pow(1 - scrollProgress, 3);
  const logoProgress = isDesktop ? e : 0;
  const mobileHeaderOffset =
    HEADER_MIN_HEIGHT_REM + HEADER_VERTICAL_PADDING_REM * 2;
  const mobileHeaderElevated = mobileMenuOpen || mobileScrolled;
  const getMobileItemMotion = (index: number) => ({
    opacity: mobileMenuOpen ? 1 : 0,
    transform: mobileMenuOpen
      ? "translateY(0) scale(1)"
      : "translateY(20px) scale(0.985)",
    transition: `opacity 0.36s cubic-bezier(0.16,1,0.3,1) ${
      110 + index * 35
    }ms, transform 0.56s cubic-bezier(0.16,1,0.3,1) ${110 + index * 35}ms`,
  });

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 text-black"
      style={{
        backgroundColor: isDesktop
          ? mobileMenuOpen
            ? "#fff"
            : `rgba(255,255,255,${0.8 * e})`
          : "rgba(255,255,255,0.98)",
        borderBottom: isDesktop
          ? mobileMenuOpen
            ? "1px solid rgba(0,0,0,0.06)"
            : `1px solid rgba(0,0,0,${0.06 * e})`
          : mobileHeaderElevated
            ? "1px solid rgba(0,0,0,0.06)"
            : "1px solid rgba(0,0,0,0.03)",
        boxShadow: isDesktop
          ? mobileMenuOpen
            ? "0 12px 36px rgba(15,23,42,0.07)"
            : `0 8px 32px rgba(15,23,42,${0.05 * e})`
          : mobileHeaderElevated
            ? "0 10px 30px rgba(15,23,42,0.06)"
            : "none",
        backdropFilter:
          isDesktop && !mobileMenuOpen ? `blur(${16 * e}px)` : "none",
        WebkitBackdropFilter:
          isDesktop && !mobileMenuOpen ? `blur(${16 * e}px)` : "none",
        transition:
          "background-color 0.4s, border-color 0.4s, box-shadow 0.4s, backdrop-filter 0.4s",
      }}
    >
      {/* ── Top bar ── */}
      <div
        className="mx-auto flex max-w-360 items-center justify-between gap-6 px-5 sm:px-8 lg:px-12"
        style={{
          minHeight: `${HEADER_MIN_HEIGHT_REM}rem`,
          paddingTop: `${HEADER_VERTICAL_PADDING_REM}rem`,
          paddingBottom: `${HEADER_VERTICAL_PADDING_REM}rem`,
          position: "relative",
          zIndex: 20,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Hermes/AI"
          className="shrink-0 rounded-md text-[22px] font-black uppercase tracking-tight text-black outline-none focus-visible:ring-2 focus-visible:ring-black/15"
          style={{ textDecoration: "none" }}
        >
          <AnimatedLogo progress={logoProgress} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navigation.map((item) => {
            const isOpen = activeMenu === item.label;

            if (!item.submenu) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-1 py-1 text-[14.5px] font-medium text-black/70 transition-colors duration-200 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10"
                  style={{ textDecoration: "none" }}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-full px-1 py-1 text-[14.5px] font-medium text-black/70 transition-colors duration-200 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10"
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  aria-controls={getMenuId(item.label, "desktop")}
                  onClick={() => toggleMenu(item.label)}
                >
                  {item.label}
                  <IconChevron open={isOpen} />
                </button>

                {/* Desktop dropdown */}
                <div
                  id={getMenuId(item.label, "desktop")}
                  role="menu"
                  aria-label={item.label}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "100%",
                    zIndex: 20,
                    width: "220px",
                    transform: `translateX(-50%) translateY(${isOpen ? "0" : "-6px"})`,
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? "auto" : "none",
                    transition:
                      "opacity 0.25s cubic-bezier(0.16,1,0.3,1), transform 0.25s cubic-bezier(0.16,1,0.3,1)",
                    paddingTop: "12px",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(255,255,255,0.96)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      borderRadius: "18px",
                      border: "1px solid rgba(0,0,0,0.07)",
                      boxShadow:
                        "0 16px 48px rgba(15,23,42,0.10), 0 2px 8px rgba(15,23,42,0.06)",
                      padding: "6px",
                    }}
                  >
                    {item.submenu.map((sub) => (
                      <SubItem
                        key={sub.label}
                        label={sub.label}
                        href={sub.href}
                        onClick={() => setActiveMenu(null)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="#try-hermes"
            className="inline-flex items-center gap-1.5 rounded-[14px] bg-black px-5.5 py-2.5 text-[14px] font-medium tracking-[0.01em] text-white transition-[background-color,transform] duration-200 hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            style={{
              textDecoration: "none",
            }}
          >
            Try Hermes
            <svg
              viewBox="0 0 16 16"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
              style={{ opacity: 0.7 }}
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls={MOBILE_MENU_ID}
          onClick={() => {
            setActiveMenu(null);
            setMobileMenuOpen((c) => !c);
          }}
          className="inline-flex rounded-xl outline-none transition-colors duration-200 hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-black/15 lg:hidden"
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#000",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              transition: "opacity 0.2s, transform 0.2s",
              opacity: mobileMenuOpen ? 0 : 1,
              transform: mobileMenuOpen
                ? "rotate(90deg) scale(0.7)"
                : "rotate(0deg) scale(1)",
              position: "absolute",
            }}
          >
            <IconMenu />
          </span>
          <span
            style={{
              display: "inline-flex",
              transition: "opacity 0.2s, transform 0.2s",
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen
                ? "rotate(0deg) scale(1)"
                : "rotate(-90deg) scale(0.7)",
            }}
          >
            <IconClose />
          </span>
        </button>
      </div>

      {/* ── Mobile menu ─────────────────────────────────────────────── */}
      <div
        id={MOBILE_MENU_ID}
        className="lg:hidden"
        aria-hidden={!mobileMenuOpen}
        onClick={closeMenus}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10,
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
          transition: "opacity 0.24s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "0 0 auto 0",
            height: mobileMenuOpen ? "100dvh" : "0px",
            background: "#fff",
            boxShadow: mobileMenuOpen
              ? "0 24px 80px rgba(15,23,42,0.08)"
              : "none",
            transition:
              "height 0.62s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <div
          onClick={(event) => event.stopPropagation()}
          style={{
            position: "relative",
            height: mobileMenuOpen ? "100dvh" : "0px",
            overflowY: mobileMenuOpen ? "auto" : "hidden",
            padding: mobileMenuOpen
              ? `calc(${mobileHeaderOffset}rem + 12px) 20px 28px`
              : "0 20px",
            transition:
              "height 0.62s cubic-bezier(0.16,1,0.3,1), padding 0.24s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <nav
            className="mx-auto flex max-w-360 flex-col"
            aria-label="Mobile primary"
            style={{
              gap: "2px",
              minHeight: "100%",
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? "translateY(0)" : "translateY(10px)",
              transition:
                "opacity 0.3s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.45s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            {navigation.map((item, idx) => {
              const isOpen = activeMenu === item.label;

              if (!item.submenu) {
                return (
                  <div key={item.label} style={getMobileItemMotion(idx)}>
                    <Link
                      href={item.href}
                      onClick={closeMenus}
                      className="rounded-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10"
                      style={{
                        display: "block",
                        padding: "13px 16px",
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "rgba(0,0,0,0.75)",
                        textDecoration: "none",
                        borderRadius: "14px",
                        transition:
                          "background 0.18s, color 0.18s, transform 0.18s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "rgba(0,0,0,0.04)";
                        (e.currentTarget as HTMLElement).style.color = "#000";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                        (e.currentTarget as HTMLElement).style.color =
                          "rgba(0,0,0,0.75)";
                      }}
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              }

              return (
                <div key={item.label} style={getMobileItemMotion(idx)}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={getMenuId(item.label, "mobile")}
                    onClick={() => toggleMenu(item.label)}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "13px 16px",
                      fontSize: "15px",
                      fontWeight: 500,
                      color: isOpen ? "#000" : "rgba(0,0,0,0.75)",
                      background: isOpen ? "rgba(0,0,0,0.03)" : "transparent",
                      border: "none",
                      borderRadius: "14px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.2s, color 0.2s",
                    }}
                  >
                    <span>{item.label}</span>
                    <IconChevron open={isOpen} />
                  </button>

                  {/* Mobile submenu — smooth height transition */}
                  <div
                    id={getMenuId(item.label, "mobile")}
                    style={{
                      overflow: "hidden",
                      maxHeight: isOpen ? "400px" : "0",
                      opacity: isOpen ? 1 : 0,
                      transition:
                        "max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s",
                    }}
                  >
                    <div
                      style={{
                        margin: "4px 8px 8px",
                        background: "rgba(0,0,0,0.025)",
                        borderRadius: "14px",
                        padding: "6px",
                      }}
                    >
                      {item.submenu.map((sub) => (
                        <SubItem
                          key={sub.label}
                          label={sub.label}
                          href={sub.href}
                          onClick={closeMenus}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Mobile CTA */}
            <div
              style={{
                marginTop: "auto",
                paddingTop: "16px",
                borderTop: "1px solid rgba(0,0,0,0.06)",
                ...getMobileItemMotion(navigation.length + 1),
              }}
            >
              <Link
                href="#try-hermes"
                onClick={closeMenus}
                className="rounded-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "#0a0a0a",
                  color: "#fff",
                  borderRadius: "14px",
                  padding: "13px 24px",
                  fontSize: "15px",
                  fontWeight: 500,
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  transition: "background 0.2s",
                }}
              >
                Try Hermes
                <svg
                  viewBox="0 0 16 16"
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                  style={{ opacity: 0.7 }}
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
