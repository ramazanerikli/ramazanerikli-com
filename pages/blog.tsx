import { sanityClient } from "../sanity";
import { Post } from "../types";
import Link from "next/link";

import Layout from "../components/Layout";

interface Props {
  posts: [Post];
}

export default function Blog({ posts }: Props) {
  return (
    <div className="mx-auto">
      <Layout>
        <div className="w-full">
          <h1 className="text-3xl md:text-4xl mb-6">Blog</h1>
          <div className="ml-[-0.8rem]">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug?.current}`}>
                <div className="flex flex-col my-2 hover:bg-gray-100 rounded-md px-3 py-3 transition-all">
                  <h3 className="font-medium mb-2">{post.title}</h3>
                  <p className="text-gray-400">
                    {new Date(post._createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async () => {
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

  return {
    props: {
      posts,
    },
  };
};
