import { siteConfig } from "@/lib/seo-config"

export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          logo: `${siteConfig.url}/logo.png`,
          sameAs: [
            siteConfig.links.twitter,
            siteConfig.links.github,
            // Add other social profiles
          ],
        }),
      }}
    />
  )
}

export function WebsiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteConfig.url}/tools?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }),
      }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${siteConfig.url}${item.url}`,
          })),
        }),
      }}
    />
  )
}

export function ArticleSchema({
  title,
  description,
  image,
  url,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string
  description: string
  image: string
  url: string
  datePublished: string
  dateModified?: string
  authorName: string
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description: description,
          image: image,
          author: {
            "@type": "Person",
            name: authorName,
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: {
              "@type": "ImageObject",
              url: `${siteConfig.url}/logo.png`,
            },
          },
          datePublished,
          dateModified: dateModified || datePublished,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteConfig.url}${url}`,
          },
        }),
      }}
    />
  )
}

export function ProductSchema({
  name,
  description,
  image,
  url,
  price,
  rating,
  category,
}: {
  name: string
  description: string
  image: string
  url: string
  price: any
  rating: number
  category: string
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name,
          description,
          image,
          url: `${siteConfig.url}${url}`,
          brand: {
            "@type": "Brand",
            name,
          },
          offers: {
            "@type": "Offer",
            price: price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating,
            bestRating: "5",
            worstRating: "1",
            ratingCount: "100", // Replace with actual count when available
          },
          category,
        }),
      }}
    />
  )
}