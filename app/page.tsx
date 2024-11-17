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
    serviceCards {
      id
      title
      copy(markdown: true)
      image {
        alt
        url
      }
    }
    contactImage {
      alt
      url
    }
    contactInfo(markdown: true)
    stats {
      id
      description
      stat
    }
    testimonials {
      id
      name
      copy(markdown: true)
      headshotOrLogo {
        alt
        url
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

  const { title, copy, serviceCards, logos, contactImage, contactInfo, stats, testimonials } = homepage;

  return homepage && (
    <main className="space-y-12 lg:space-y-24">
      <h1>{title}</h1>
      <Copy content={copy} />
      <section 
        className={`grid gap-4 lg:gap-10 px-5 lg:px-20 bg-gray-100`}
        style={{ gridTemplateColumns: `repeat(${logos.assets.length}, minmax(0, 1fr))`}}
      >
        {logos.assets.map((logo: { id: string | undefined; url: string | undefined; alt: string | ""; }) =>
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
      </section>
      <section className="flex lg:flex-row flex-col gap-5 lg:gap-20">
        {serviceCards.length > 0 && serviceCards.map((card: { id: string; title: string ; copy: string; image: { url: string | undefined, alt: string | undefined; }; }) => {
          return (
            <div key={card.id}>
              <h3 className="text-bold">{card.title}</h3>
              <Copy content={card.copy} />
              <img
                src={card.image.url}
                alt={card.image.alt}
                width="100%"
                height="auto"
              />
            </div>
          )
        })}
      </section>
      <a href="/how-does-it-work" aria-label="Learn more" className="text-white bg-gray-500 rounded-2xl px-5 py-3">
          Learn more about services
      </a>
      <section>
        <h3 className="font-bold">Benefits of coaching</h3>
        <table className="w-full">
          <tbody className="mx-auto">
            {stats.map((stat: { id: string; stat: string | undefined; description: string |  undefined; }) => {
              return (
                <tr key={stat.id}>
                  <td className="lg:w-1/3 text-right pr-5">
                    {stat.stat}
                  </td>
                  <td className="lg:w-2/3">
                    {stat.description}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
      <section>
        {testimonials.map((testimonial: { id: string; name: string | undefined; copy: string; headshotOrLogo: { url: string | undefined; alt: string | undefined; }; }) => {
          return (
            <div key={testimonial.id}>
              <p>{testimonial.name}</p>
              <Copy content={testimonial.copy} />
              {testimonial.headshotOrLogo?.url &&
                <img
                  src={testimonial.headshotOrLogo.url}
                  alt={testimonial.headshotOrLogo.alt}
                  width="100%"
                  height="auto"
                  className="max-w-[150px]"
                />
              }
            </div>
          )
        })}
      </section>
      <section>
        <h3 className="font-bold">
          Contact
        </h3>
        <Copy content={contactInfo} />
        <div className="w-lg">
          <img
            src={contactImage.url}
            alt={contactImage.alt}
            width="100%"
            height="auto"
          />
        </div>
      </section>

    </main>
  )
}