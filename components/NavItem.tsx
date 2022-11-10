import { FC } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import cn from "classnames";

const NavItem: FC<{
  href: string;
  text: string;
}> = ({ href, text }) => {
  const router = useRouter();
  const isActive = router.asPath === href;
  return (
    <NextLink
      href={href}
      className={cn(
        isActive ? "font-bold text-gray-800" : "font-normal",
        "hidden md:inline-block py-2 px-3 rounded-md hover:bg-gray-100 transition-all"
      )}
    >
      <span>{text}</span>
    </NextLink>
  );
};

export default NavItem;
