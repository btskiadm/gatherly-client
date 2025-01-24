"use client";
import { RefObject } from "@fullcalendar/core/preact";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled("a")({});

interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Omit<NextLinkProps, "href" | "as" | "passHref" | "onMouseEnter" | "onClick" | "onTouchStart"> {
  to: NextLinkProps["href"];
  linkAs?: NextLinkProps["as"];
  ref?: RefObject<HTMLAnchorElement | null>;
}

export const NextLinkComposed = ({
  to,
  linkAs,
  replace,
  scroll,
  shallow,
  prefetch,
  legacyBehavior = true,
  locale,
  ref,
  ...other
}: NextLinkComposedProps) => {
  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
      legacyBehavior={legacyBehavior}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  );
};

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps["as"];
  href: NextLinkProps["href"];
  linkAs?: NextLinkProps["as"]; // Useful when the as prop is shallow by styled().
  noLinkStyle?: boolean;
  ref?: RefObject<HTMLAnchorElement | null>;
} & Omit<NextLinkComposedProps, "to" | "linkAs" | "href"> &
  Omit<MuiLinkProps, "href">;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/pages/api-reference/components/link
export const Link = ({
  activeClassName = "active",
  as,
  className: classNameProps,
  href,
  legacyBehavior,
  linkAs: linkAsProp,
  locale,
  noLinkStyle,
  prefetch,
  replace,
  role, // Link don't have roles.
  scroll,
  shallow,
  ref,
  ...other
}: LinkProps) => {
  const router = useRouter();
  const pathname = usePathname();
  // const pathname = typeof href === "string" ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: pathname === pathname && activeClassName,
  });

  const linkAs = linkAsProp || as;
  const nextjsProps = {
    to: href,
    linkAs,
    replace,
    scroll,
    shallow,
    prefetch,
    legacyBehavior,
    locale,
  };

  if (noLinkStyle) {
    return <NextLinkComposed className={className} ref={ref} {...nextjsProps} {...other} />;
  }

  return <MuiLink component={NextLinkComposed} className={className} ref={ref} {...nextjsProps} {...other} />;
};
