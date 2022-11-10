import { GetStaticProps } from "next";
import React from "react";
import Layout from "../../components/Layout";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../types";

import dynamic from "next/dynamic";

const SyntaxHighlighter: any = dynamic(
  () => import("react-syntax-highlighter"),
  { ssr: false }
);

const BlockContent = require("@sanity/block-content-to-react");

import style from "react-syntax-highlighter/dist/cjs/styles/hljs/a11y-light";



interface Props {
  post: Post;
}

function Post({ post }: Props) {


  return (


      <Layout>
        <div className="w-full">
        <h1 className="text-3xl md:text-4xl">{post.title}</h1>
        <p className="text-gray-400">{new Date(post._createdAt).toLocaleDateString()}</p>

        <div className="blog-content mt-10">
          <BlockContent
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            blocks={post.body}
            serializers={{
              types: {
                code: (props: any) => (
                  <div className="my-2">
                    <SyntaxHighlighter
                    className="syntax-highlighter"
                      language={props.node.language}
                      style={style}
                      customStyle={{ padding: '1rem', background: '#f3f4f6' }}
                    >
                      {props.node.code}
                    </SyntaxHighlighter>
                  </div>
                ),
              },
            }}
          />
        </div>
        </div>
      </Layout>


  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug {
      current
    },
  }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
  *[_type == "post" && slug.current == $slug] [0] {
    _id,
    title,
    _createdAt,
    description,
    mainImage,
    slug,
    body
  }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
