import Layout from "../components/Layout";
import { sanityClient, urlFor } from "../sanity";

//import createImageUrlBuilder from "@sanity/image-url";
import Image from "next/image";

import { Work } from "../types";

interface Props {
  works: [Work];
}

export default function Portfolio({ works }: Props) {
  return (
    <Layout>
      <div className="w-full">
        <h1 className="text-3xl md:text-4xl mb-6">Portfolio</h1>
        <div className="ml-[-0.8rem]">
          <div className="flex gap-6 flex-col">
            {works.map((work) => (
              <div key={work._id} className="w-full">
                <div className="flex flex-col my-2 hover:bg-gray-100 rounded-md px-3 py-3 transition-all">
                  <div className="flex flex-col md:flex-row gap-6">
                    {work.mainImage && (
                      <Image
                        src={urlFor(work.mainImage).url()!}
                        alt="asd"
                        width={"352"}
                        height={"253"}
                      />
                    )}
                    <div className="flex flex-col">
                      <h3 className="font-medium mb-2">{work.title}</h3>

                      <p>{work.description}</p>
                      <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-row items-center gap-1 source-code"
                      >
                        Source Code{" "}
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 12 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M11 10h1v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h3v1H1v10h10v-3zM6 2l2.25 2.25L5 7.5 6.5 9l3.25-3.25L12 8V2H6z"
                          ></path>
                        </svg>{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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
    mainImage,
    link
  }`;

  const works = await sanityClient.fetch(query);

  return {
    props: {
      works,
    },
  };
};
