/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { performRequest } from '../lib/datocms';
import { toNextMetadata } from "react-datocms";
import Copy from './_components/Copy';

const PAGE_CONTENT_QUERY = `
  query Home {
    homepage {
      title
      copy(markdown: true)
      seo: _seoMetaTags {
        attributes
        content
        tag
      }
      logos {
        assets {
          alt
          url
          id
        }
    }
    }
    site: _site {
      favicon: faviconMetaTags {
        attributes
        content
        tag
      }
    }
  }`;



export async function generateMetadata() {
  const { site, homepage }: any = await performRequest(PAGE_CONTENT_QUERY);
  
  return toNextMetadata([ ...site.favicon, ...homepage.seo ])
}


export default async function Home() {
  const { homepage }: any = await performRequest(PAGE_CONTENT_QUERY);

  return homepage && (
    <div>
      {homepage.title}
      <Copy content={homepage.copy} />
      <div 
        className={`grid gap-4 lg:gap-10 px-5 lg:px-20 bg-gray-100`}
        style={{ gridTemplateColumns: `repeat(${homepage.logos.assets.length}, minmax(0, 1fr))`}}
      >
        {homepage.logos.assets.map((logo: { id: string | undefined; url: string | undefined; alt: string | ""; }) =>
          <div key={logo.id} className="w-full h-full flex justify-center items-center">
            <img
              src={logo.url}
              alt={logo.alt}
              width="100%"
              height="auto"
              className="max-w-[150px]"
            />
          </div>
        )}
      </div>
    </div>
  )
}