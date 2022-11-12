import { sanityClient } from "../sanity";

import fs from "fs";
import glob from "glob";
const Sitemap = () => {
  return null;
};

export const getServerSideProps = async (
  { res }: any /* todo narrow typing */
) => {
  const query = `
  *[_type == "post"] {
    _id,
    title,
    _createdAt,
    description,
    mainImage,
    slug,
  }`;

  const posts = await sanityClient.fetch(query);

  const BASE_URL = "https://ramazanerikli.com";

  const pagesDir = "pages/**/*.tsx";
  let pagesPaths = await glob.sync(pagesDir);

  const staticPaths = (pagesPaths = pagesPaths
    .filter((path) => !path.includes("["))
    .filter((path) => !path.includes("/_"))
    .filter((path) => !path.includes("404"))
    .map((staticPagePath) => {
      return `${BASE_URL}/${staticPagePath}`;
    }));

  const dynamicPaths = posts.map((post) => {
    return `${BASE_URL}/blog/${post.slug.current}`;
  });

  const allPaths = [...staticPaths, ...dynamicPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
