import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './speakers.module.css';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';

// Correct Paths for Social Media Icons
const X_LOGO_LIGHT = '/img/icons/x-logo-black.png';
const X_LOGO_DARK = '/img/icons/x-logo-white.png';
const LINKEDIN_LOGO_LIGHT = '/img/icons/InBug-Black.png';
const LINKEDIN_LOGO_DARK = '/img/icons/InBug-White.png';

// Speaker List with Social Media Links
const SpeakerList = [
  {
    title: 'Kirill Gavrylyuk - Microsoft',
    name: 'Kirill',
    img: '/img/speakers/Kirill_Gavrylyuk.jpg',
    intro: 'Product Leader with experience of leading and growing multiple large-scale cloud services...',
    session: {
      title: 'Building Scalable Cloud Services',
      abstract: 'An in-depth session on how to build scalable and reliable cloud services...'
    },
    x: 'https://x.com/kirillg_msft',
    linkedin: 'https://www.linkedin.com/in/kirillgavrylyuk/'
  },
  {
    title: 'Kirill Gavrylyuk - Microsoft (No Social)',
    name: 'Kirill No Social',
    img: '/img/speakers/Kirill_Gavrylyuk.jpg',
    intro: 'Product Leader with experience of leading and growing multiple large-scale cloud services...',
    session: {
      title: 'Scaling with Cloud Services',
      abstract: 'A session about best practices in cloud service scaling...'
    }
    // No social media links
  }
];

// Dynamically split speakers into two columns
const leftSpeakers = SpeakerList.filter((_, index) => index % 2 === 0);
const rightSpeakers = SpeakerList.filter((_, index) => index % 2 !== 0);

// Define TypeScript Props
interface FeatureProps {
  img: string;
  title: string;
  name: string;
  intro: string;
  session: { title: string; abstract: string };
  x?: string;
  linkedin?: string;
}

// Speaker card component
function Feature({ img, title, name, intro, session, x, linkedin }: FeatureProps) {
  const { colorMode } = useColorMode(); // ✅ Detect theme mode
  const isDarkMode = colorMode === 'dark';

  return (
    <div className={clsx(styles.featureCard)}>
      
      {/* Image Section */}
      <div className={clsx(styles.featureImgContainer)}>
        <img className={styles.featureImg} alt={title} src={img} />
      </div>

      {/* Content & Link Wrapper */}
      <div className={clsx(styles.featureContent)}>
        <Link 
          to={`/speakers/speaker?name=${encodeURIComponent(name)}&title=${encodeURIComponent(title)}&intro=${encodeURIComponent(intro)}&sessionTitle=${encodeURIComponent(session.title)}&sessionAbstract=${encodeURIComponent(session.abstract)}&img=${encodeURIComponent(img)}`}
          className={styles.featureLink}
        >
          <h3 className={styles.featureTitle}>{title}</h3>
          <p className={styles.featureIntro}>{intro}</p>
        </Link>

        {/* Social Media Icons (Now Using Correct Theme-Based Icons) */}
        {(x || linkedin) && (
          <div className={styles.socialIcons}>
            {x && (
              <a href={x} target="_blank" rel="noopener noreferrer">
                <img className={styles.socialIcon} src={isDarkMode ? X_LOGO_DARK : X_LOGO_LIGHT} alt="X Logo" />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <img className={styles.socialIcon} src={isDarkMode ? LINKEDIN_LOGO_DARK : LINKEDIN_LOGO_LIGHT} alt="LinkedIn Logo" />
              </a>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

// Main Speakers Page
export default function Speakers() {
  return (
    <Layout description="Welcome to the Azure Cosmos DB Conf 2025 site">
      <main>
        <section className={styles.speakerSection}>
          <div className={styles.speakerContainer}>

            {/* Centered Heading */}
            <h2 className={styles.speakerHeading}>
              Hear from the Azure Cosmos DB team, your favorite community members, and fresh faces.
            </h2>

            {/* 2-column responsive grid */}
            <div className={styles.speakerGrid}>
              <div className={styles.speakerColumn}>
                {leftSpeakers.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
              <div className={styles.speakerColumn}>
                {rightSpeakers.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>
    </Layout>
  );
}
