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
      <nav>
        <h1>{title}</h1>
        <ul>
        <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#benefits">Benefits of coaching</a>
          </li>
          <li>
            <a href="#testimonials">Testimonials</a>
          </li>
          <li>
            <a href="how-does-it-work">How does it work?</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
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
      <section className="container mx-auto">
        <h2 className="font-bold text-4xl mb-20" id="services">Services</h2>
        {serviceCards.length > 0 && (
          <div className="flex grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-20 h-full xl:mx-0 mx-8">
            {serviceCards.length > 0 && serviceCards.map((card: { id: string; title: string ; copy: string; image: { url: string | undefined, alt: string | undefined; }; }) => {
              return (
                <div key={card.id} className="max-w-[900px] mx-auto flex flex-col gap-10 bg-white rounded-xl p-6 xl:p-10">
                  <div className="flex flex-col grow">
                    <h3 className="font-bold text-3xl mb-8">{card.title}</h3>
                    <Copy content={card.copy} />
                  </div>
                  <img
                    src={card.image.url}
                    alt={card.image.alt}
                    width="100%"
                    height="auto"
                    className="mx-auto rounded-xl"
                  />
                </div>
              )
            })}
          </div>
          )
        }
      </section>
      <a href="/how-does-it-work" aria-label="Learn more" className="text-white bg-gray-500 rounded-2xl px-5 py-3">
          Learn more about services
      </a>
      <section>
        <h3 className="font-bold" id="benefits">Benefits of coaching</h3>
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
        <h3 id="testimonials">Testimonials</h3>
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
        <h3 className="font-bold" id="contact">
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
      <div className="bg-white rounded-full fixed right-10 bottom-10 px-6 py-4 border border-20 border-[#A2D1FE]">
        <a href="#contact">Get in touch</a>
      </div>
    </main>
  )
}