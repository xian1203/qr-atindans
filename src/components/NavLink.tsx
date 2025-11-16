import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  className?: string;
  activeClassName?: string;
  children?: React.ReactNode;
  end?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, className, activeClassName, children, end = false }, ref) => {
    const location = useLocation();
    const isActive = end 
      ? location.pathname === to 
      : location.pathname.startsWith(to);

    return (
      <Link
        ref={ref}
        to={to}
        className={cn(
          className,
          isActive && activeClassName
        )}
      >
        {children}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
