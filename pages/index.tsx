import { Post } from "../types";

import Layout from "../components/Layout";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div className="mx-auto">
      <Layout>
        <div>
          <h1 className="text-3xl md:text-4xl mb-6">
            <span className="mr-3" role="img" aria-label="Waving hand">
              👋🏼
            </span>
            Hey, I'm Ramazan
          </h1>
          <p>
            I am a Software Developer, who has a front-end background for years
            and mainly focusing on building full-stack applications. My area of
            interest is building accessible and fast web experiences. Currently,
            I am working as a freelancer.
          </p>
        </div>
      </Layout>
    </div>
  );
}
