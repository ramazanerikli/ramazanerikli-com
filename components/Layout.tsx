import Head from "next/head";

import Footer from "./Footer";
import MobileMenu from "./MobileMenu";

import NavItem from "./NavItem";



export default function Layout(props: any) {
  const { children } = props;

  return (
    <div className="container mx-auto px-8">
      <Head>
        <title>Ramazan Erikli - Software Developer</title>
        <meta name="google-site-verification" content="qPgF6cx1y6cqvr3af-0WR5JPo2YvTq0oZsXRKJ2cTbY" />
        <meta name="robots" content="follow, index" />
        <meta content="Full-stack Developer" name="description" />
        <meta property="og:title" content={"Ramazan Erikli - Software Developer"} />
        <meta property="og:type" content={"website"} />
        <meta property="og:site_name" content="Ramazan Erikli" />
        <meta property="og:description" content={"Ramazan Erikli - Software Developer"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ramazanerikli_" />
        <meta name="twitter:title" content={"Ramazan Erikli - Software Developer"} />
        <meta name="twitter:description" content={"Ramazan Erikli - Software Developer"} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <nav className="nav pt-6 flex align-center justify-between">
        <div className="ml-[-0.8rem] flex gap-x-1 w-full">
          <MobileMenu />
          <NavItem href="/" text="Home" />
          <NavItem href="/blog" text="Blog" />
          <NavItem href="/portfolio" text="Portfolio" />
          <NavItem href="/contact" text="Contact" />
        </div>
        {/* todo: add theme switcher button */}
        <button className="hidden btn" type="button" aria-label="Toggle Theme">
          light
        </button>
      </nav>

      <div className="flex min-h-screen pb-16 pt-12">{children}</div>

      <Footer />
    </div>
  );
}
