import Layout from "../components/Layout";
import { sanityClient, urlFor } from "../sanity";

import Link from "next/link";

import { Work } from "../types";

interface Props {
  works: [Work];
}

export default function Portfolio({ works }: Props) {
  return (
    <Layout>
      <div className="w-full">
        <h1 className="text-3xl md:text-4xl mb-6">Portfolio</h1>
        <div className="pt-4">
          <div className="flex gap-6 flex-col">
            {works.map((work) => (
              <Link href={work.link} target="_blank" rel="noopener noreferrer">
                <div
                  className={`border-l-4 border-${work.color}-400 rounded-md px-3 py-2 bg-white hover:bg-gray-100 cursor-pointer transition-all`}
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
