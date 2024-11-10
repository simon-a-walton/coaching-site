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
    </div>
  )
}