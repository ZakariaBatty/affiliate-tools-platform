export const siteConfig = {
   name: 'ToolsHub',
   description:
      'Discover and compare the best affiliate marketing tools for your business',
   url: 'https://toolshub.com', // Replace with your actual domain
   ogImage: '/images/og-image.jpg', // Default OG image
   links: {
      twitter: 'https://twitter.com/toolshub',
      github: 'https://github.com/toolshub',
   },
   creator: '@toolshub',
};

export type MetadataProps = {
   title?: string;
   description?: string;
   image?: string;
   url?: string;
   type?: string;
   keywords?: string[];
   noIndex?: boolean;
};

export function constructMetadata({
   title,
   description,
   image,
   url,
   type = 'website',
   keywords = [],
   noIndex = false,
}: MetadataProps = {}) {
   return {
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description: description || siteConfig.description,
      keywords: [
         'affiliate tools',
         'marketing tools',
         'tool comparison',
         'affiliate marketing',
         ...keywords,
      ],
      authors: [{ name: 'ToolsHub Team' }],
      creator: siteConfig.creator,
      openGraph: {
         type,
         locale: 'en_US',
         url: url || siteConfig.url,
         title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
         description: description || siteConfig.description,
         siteName: siteConfig.name,
         images: [
            {
               url: image || `${siteConfig.url}${siteConfig.ogImage}`,
               width: 1200,
               height: 630,
               alt: title || siteConfig.name,
            },
         ],
      },
      twitter: {
         card: 'summary_large_image',
         title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
         description: description || siteConfig.description,
         images: [image || `${siteConfig.url}${siteConfig.ogImage}`],
         creator: siteConfig.creator,
      },
      robots: {
         index: !noIndex,
         follow: !noIndex,
         googleBot: {
            index: !noIndex,
            follow: !noIndex,
            'max-image-preview': 'large' | 'none' | 'standard',
            'max-snippet': -1,
         },
      },
      icons: {
         icon: '/favicon.ico',
         shortcut: '/favicon-16x16.png',
         apple: '/apple-touch-icon.png',
      },
      metadataBase: new URL(siteConfig.url),
      alternates: {
         canonical: url || siteConfig.url,
      },
   };
}
