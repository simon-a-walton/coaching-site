/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { performRequest } from '../../lib/datocms';
import { toNextMetadata } from "react-datocms";
import Copy from '../_components/Copy';

const PAGE_CONTENT_QUERY = `
 query Info {
  infoPage {
    title
    infoBlock {
      copy(markdown: true)
      id
      title
    }
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
  const { site, infoPage }: any = await performRequest(PAGE_CONTENT_QUERY);
  
  return toNextMetadata([ ...site.favicon, ...infoPage.seo ])
}


export default async function Info() {
  const { infoPage }: any = await performRequest(PAGE_CONTENT_QUERY);

  const { infoBlock, title } = infoPage;

  return infoPage && (
    <main className="space-y-12 lg:space-y-24">
      <h1>{title}</h1>
      <h2>Interested in coaching for your workplace?​ Here is more information</h2>
      <section className="flex flex-col gap-5 lg:gap-20">
        {infoBlock.length > 0 && infoBlock.map((card: { id: string; title: string ; copy: string; }) => {
          return (
            <div key={card.id}>
              <h3 className="text-bold">{card.title}</h3>
              <Copy content={card.copy} />
            </div>
          )
        })}
      </section>
    </main>
  )
}