import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Users, Shield, Heart, Palette, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchFocusAreas } from "@/lib/api-client";
import type { FocusArea } from "@/lib/types";
import { logo } from "@/images/images";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const defaultThemesSubmenu = useMemo<
    Array<{
      name: string;
      href: string;
      icon: React.ComponentType<{ className?: string }>;
    }>
  >(
    () => [
      {
        name: "Persons with Disabilities",
        href: "/themes/disabilities",
        icon: Users,
      },
      { name: "Violence Against Women", href: "/themes/vaw", icon: Shield },
      {
        name: "Mental Health & Wellness",
        href: "/themes/mental-health",
        icon: Heart,
      },
      { name: "LGBTQ+ Communities", href: "/themes/lgbtq", icon: Palette },
    ],
    [],
  );

  const [themesSubmenu, setThemesSubmenu] = useState(defaultThemesSubmenu);

  useEffect(() => {
    let active = true;

    const toFocusAreaItem = (fa: FocusArea) => {
      const name = typeof fa.title === "string" ? fa.title.trim() : "";
      if (!name || !fa.id) return null;

      const title = name.toLowerCase();
      const hashTag = (fa.hashTag ?? "").toLowerCase();

      const icon = (() => {
        if (title.includes("disabil") || hashTag.includes("disabil"))
          return Users;
        if (
          title.includes("violence") ||
          title.includes("women") ||
          title.includes("vaw") ||
          hashTag.includes("vaw")
        )
          return Shield;
        if (title.includes("mental") || title.includes("wellness"))
          return Heart;
        if (
          title.includes("lgbt") ||
          title.includes("queer") ||
          hashTag.includes("lgbt")
        ) {
          return Palette;
        }
        return FileText;
      })();

      return {
        name,
        href: `/focus/${encodeURIComponent(fa.id)}`,
        icon,
      };
    };

    fetchFocusAreas()
      .then((rows) => {
        if (!active) return;
        if (!Array.isArray(rows) || rows.length === 0) return;

        const mapped = rows.map(toFocusAreaItem).filter(Boolean) as Array<{
          name: string;
          href: string;
          icon: React.ComponentType<{ className?: string }>;
        }>;

        if (mapped.length > 0) setThemesSubmenu(mapped);
      })
      .catch(() => {
        // Keep defaults on error.
      });

    return () => {
      active = false;
    };
  }, [defaultThemesSubmenu]);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Themes",
      href: "/themes",
      submenu: themesSubmenu,
    },
    { name: "Analytics", href: "/analytics" },
    { name: "Campaigns", href: "/get-involved" },
    { name: "Events", href: "/events" },
    { name: "Community", href: "/community" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={logo}
              alt="AI4InclusiveGh logo"
              className="w-10 h-10 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">
                AI4InclusiveGh
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Advocacy Through AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-primary relative",
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {item.name}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300",
                      isActive(item.href)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
                    )}
                  ></span>
                </Link>

                {/* Dropdown for Themes */}
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
                    <div className="p-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          to={subitem.href}
                          className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground hover:translate-x-1 transition-all duration-200"
                        >
                          {subitem.icon && (
                            <subitem.icon className="h-4 w-4 mr-3" />
                          )}
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link to="/community">
              <Button
                variant="default"
                size="sm"
                className="bg-primary hover:bg-primary/90 gap-2 hover:scale-105 transition-transform duration-300"
              >
                <Users className="h-4 w-4" />
                Join Community
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>

                  {/* Mobile submenu */}
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          to={subitem.href}
                          className="flex items-center px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {subitem.icon && (
                            <subitem.icon className="h-4 w-4 mr-3" />
                          )}
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
