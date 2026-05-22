import { Helmet } from 'react-helmet-async';

export default function SEO() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://yuviicabs.in/#localbusiness",
        "name": "YUVII CABS Hosur",
        "image": "https://yuviicabs.in/og-image.jpg",
        "description": "Book premium and affordable taxi services in Hosur. Safe, professional drivers, airport transfers, local and outstation cab booking available 24/7.",
        "telephone": "+91 87922 73625",
        "url": "https://yuviicabs.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Railway Station Road, Hamman Nagar",
          "addressLocality": "Hosur",
          "addressRegion": "Tamil Nadu",
          "postalCode": "635109",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "12.7409",
          "longitude": "77.8253"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        },
        "priceRange": "₹15 - ₹24 per km"
      },
      {
        "@type": "TaxiService",
        "@id": "https://yuviicabs.in/#taxiservice",
        "provider": {
          "@id": "https://yuviicabs.in/#localbusiness"
        },
        "name": "YUVII Premium Taxi Booking Hosur",
        "description": "24/7 professional cab and outstation taxi service in Hosur, Tamil Nadu. Fast pickup, transparent rates, and luxury fleet.",
        "areaServed": [
          {
            "@type": "AdministrativeArea",
            "name": "Hosur"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Bengaluru Airport"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Krishnagiri"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Electronic City"
          }
          ],
        "providerMobility": "dynamic"
      }
    ]
  };

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>YUVII CABS | Best Taxi Service in Hosur | Affordable Cab Booking 24/7</title>
      <meta name="title" content="YUVII CABS | Best Taxi Service in Hosur | Affordable Cab Booking 24/7" />
      <meta name="description" content="Book affordable taxi services in Hosur with YUVII CABS. Fast pickup, airport transfer, local and outstation cab booking available 24/7. Transparent rates from ₹15/km." />
      <meta name="keywords" content="Taxi in Hosur, Cab service Hosur, Hosur airport taxi, Taxi booking Hosur, Best cab in Hosur, Outstation taxi Hosur, YUVII CABS, Yuvii Cabs" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://yuviicabs.in" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://yuviicabs.in" />
      <meta property="og:title" content="YUVII CABS | Best Taxi Service in Hosur | Affordable Cab Booking 24/7" />
      <meta property="og:description" content="Book affordable taxi services in Hosur with YUVII CABS. Fast pickup, airport transfer, local and outstation cab booking available 24/7." />
      <meta property="og:image" content="https://yuviicabs.in/og-image.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://yuviicabs.in" />
      <meta property="twitter:title" content="YUVII CABS | Best Taxi Service in Hosur | Affordable Cab Booking 24/7" />
      <meta property="twitter:description" content="Book affordable taxi services in Hosur with YUVII CABS. Fast pickup, airport transfer, local and outstation cab booking available 24/7." />
      <meta property="twitter:image" content="https://yuviicabs.in/og-image.jpg" />

      {/* JSON-LD Schema Structuring */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}
