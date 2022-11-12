import { sanityClient } from "../sanity";

import fs from "fs";
const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
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

  const staticPaths = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "api",
        "_app.tsx",
        "_document.tsx",
        // "404.js", todo: create a 404 page template
        "sitemap.xml.tsx",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${BASE_URL}/${staticPagePath}`;
    });

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
