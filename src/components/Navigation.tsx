import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Users,
  Shield,
  Heart,
  Palette,
  FileText,
  UserPlus,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logo } from "@/images/images";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: null },
    { name: "About", href: "/about", icon: null },
    {
      name: "Themes",
      href: "/themes",
      icon: null,
      submenu: [
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
    },
    // { name: "Analytics", href: "/analytics", icon: BarChart3 },
    // { name: "Reports", href: "/reports", icon: FileText },
    { name: "Get Involved", href: "/get-involved", icon: UserPlus },
    // { name: "Resources", href: "/resources", icon: BookOpen },
    { name: "Community", href: "/community", icon: MessageCircle },
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
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="AI4InclusiveGh logo"
              className="h-12 w-12 rounded-lg object-cover border border-border shadow-sm"
            />
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              AI4InclusiveGh
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive(item.href)
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {item.name}
                </Link>

                {/* Dropdown for Themes */}
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          to={subitem.href}
                          className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
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

            <Link to="/community/#contact">
              <Button
                variant="default"
                size="sm"
                className="bg-gradient-hero hover:opacity-90"
              >
                Get In Touch
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
