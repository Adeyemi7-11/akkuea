"use client";
import { usePathname } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Menu,
  X,
  Building2,
  LayoutDashboard,
  Store,
  Landmark,
  Rocket,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { WalletStatusWidget } from "@/components/layout/WalletStatusWidget";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
export function Navbar() {
  const pathname = usePathname();
  useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pilotMenuOpen, setPilotMenuOpen] = useState(false);
  const t = useTranslations("Navbar");
  const navigation = [
    { name: t("dashboard"), href: "/dashboard", icon: LayoutDashboard },
    { name: t("marketplace"), href: "/marketplace", icon: Store },
    { name: t("tokenize"), href: "/tokenize", icon: Building2 },
    { name: t("lending"), href: "/lending", icon: Landmark },
  ];
  const pilotNavigation = [
    { name: t("pilotInvestor"), href: "/pilot/investor" },
    { name: t("pilotOnboarding"), href: "/pilot/onboarding" },
    { name: t("pilotAlly"), href: "/pilot/ally" },
    { name: t("pilotReview"), href: "/pilot/review/whitelist" },
  ];
  const isPilotActive = pathname?.startsWith("/pilot");
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#262626]"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <BrandLogo animateIcon textClassName="hidden sm:block" />
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer",
                    isActive
                      ? "text-white"
                      : "text-neutral-500 hover:text-white",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-[#1a1a1a] rounded-md border border-[#262626]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <item.icon className="w-3.5 h-3.5" />
                    {item.name}
                  </span>
                </Link>
              );
            })}
            {/* Pilot dropdown */}
            <div className="relative">
              <button
                onClick={() => setPilotMenuOpen(!pilotMenuOpen)}
                onBlur={() => setTimeout(() => setPilotMenuOpen(false), 150)}
                className={cn(
                  "relative px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5",
                  isPilotActive
                    ? "text-white bg-[#1a1a1a] border border-[#262626]"
                    : "text-neutral-500 hover:text-white",
                )}
                aria-haspopup="true"
                aria-expanded={pilotMenuOpen}
              >
                <Rocket className="w-3.5 h-3.5" />
                {t("pilot")}
                <ChevronDown className={cn("w-3 h-3 transition-transform", pilotMenuOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {pilotMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-44 bg-[#111] border border-[#262626] rounded-md shadow-xl overflow-hidden z-50"
                  >
                    {pilotNavigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setPilotMenuOpen(false)}
                        className={cn(
                          "flex items-center px-3 py-2 text-xs font-medium transition-colors",
                          pathname === item.href
                            ? "bg-[#1a1a1a] text-white"
                            : "text-neutral-400 hover:text-white hover:bg-[#1a1a1a]/60",
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <WalletStatusWidget />
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-neutral-500 hover:text-white hover:bg-[#1a1a1a] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-[#262626] overflow-hidden"
            >
              <div className="py-3 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-medium transition-colors cursor-pointer",
                        isActive
                          ? "bg-[#1a1a1a] text-white border border-[#262626]"
                          : "text-neutral-500 hover:text-white hover:bg-[#1a1a1a]/50",
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
                {/* Pilot section in mobile menu */}
                <div className="pt-1 border-t border-[#262626]">
                  <p className="px-3 py-1.5 text-[10px] font-semibold text-neutral-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Rocket className="w-3 h-3" />
                    {t("pilot")}
                  </p>
                  {pilotNavigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-medium transition-colors cursor-pointer",
                          isActive
                            ? "bg-[#1a1a1a] text-white border border-[#262626]"
                            : "text-neutral-500 hover:text-white hover:bg-[#1a1a1a]/50",
                        )}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}