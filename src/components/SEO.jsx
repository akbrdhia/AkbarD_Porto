import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const siteTitle = "Akbar Dhia | Mobile & Full-Stack Developer";
  const defaultDescription = "Software Engineer specialized in Mobile and Full-Stack Web Development. Explore my portfolio showcasing innovative projects and solutions.";
  const siteUrl = "https://akbardhia.me"; // Update this with your actual production URL
  const defaultImage = "/about-portrait.jpg";

  const seoTitle = title ? `${title} | Akbar Dhia` : siteTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image?.startsWith('http') ? image : `${siteUrl}${image || defaultImage}`;
  const seoUrl = url?.startsWith('http') ? url : `${siteUrl}${url || ''}`;

  return (
    <Helmet prioritizeSeoTags>
      {/* Standard tags */}
      <title key="title">{seoTitle}</title>
      <meta key="meta-title" name="title" content={seoTitle} />
      <meta key="meta-desc" name="description" content={seoDescription} />
      {keywords && <meta key="meta-keywords" name="keywords" content={keywords} />}
      <link rel="canonical" href={seoUrl} />

      {/* Open Graph / Facebook */}
      <meta key="og-type" property="og:type" content="website" />
      <meta key="og-url" property="og:url" content={seoUrl} />
      <meta key="og-title" property="og:title" content={seoTitle} />
      <meta key="og-desc" property="og:description" content={seoDescription} />
      <meta key="og-img" property="og:image" content={seoImage} />

      {/* Twitter */}
      <meta key="tw-card" property="twitter:card" content="summary_large_image" />
      <meta key="tw-url" property="twitter:url" content={seoUrl} />
      <meta key="tw-title" property="twitter:title" content={seoTitle} />
      <meta key="tw-desc" property="twitter:description" content={seoDescription} />
      <meta key="tw-img" property="twitter:image" content={seoImage} />
    </Helmet>
  );
};

export default SEO;
