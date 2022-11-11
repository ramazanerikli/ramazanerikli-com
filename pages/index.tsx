import { Post } from "../types";
import { Work } from "../types";

import Layout from "../components/Layout";

import Link from "next/link";

import { sanityClient } from "../sanity";

interface Props {
  posts: [Post];
  works: [Work];
}

export default function Home({ posts, works }: Props) {
  const latestProjects = works.slice(-3);

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

          <div className="pt-12">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-2xl font-bold">Latest Projects</h2>

              <Link
                href="/portfolio"
                className="flex flex-row gap-1 items-center bg-white hover:bg-gray-100 transition-all rounded-md px-3 py-2"
              >
                View all
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>

            <div className="featured-content flex gap-6 flex-col mt-4">
              {latestProjects.map((work) => (
                <Link
                  key={work._id}
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className={`featured-project border-l-4 rounded-md px-3 py-2 bg-white hover:bg-gray-100 cursor-pointer transition-all`}
                  >
                    <div className="flex flex-row gap-1 items-center">
                      <h3 className="font-bold">{work.title}</h3>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 12 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11 10h1v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h3v1H1v10h10v-3zM6 2l2.25 2.25L5 7.5 6.5 9l3.25-3.25L12 8V2H6z"
                        ></path>
                      </svg>
                    </div>
                    <p>{work.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `
  *[_type == "work"] {
    _id,
    title,
    description,
    color,
    link
  }`;

  const works = await sanityClient.fetch(query);

  return {
    props: {
      works,
    },
  };
};
