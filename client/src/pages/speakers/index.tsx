import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './speakers.module.css';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';

import speakerData from './speakers.json';

const X_LOGO_LIGHT = '/img/icons/x-logo-black.png';
const X_LOGO_DARK = '/img/icons/x-logo-white.png';
const LINKEDIN_LOGO_LIGHT = '/img/icons/InBug-Black.png';
const LINKEDIN_LOGO_DARK = '/img/icons/InBug-White.png';

interface FeatureProps {
  img: string;
  title: string;
  name: string;
  intro: string;
  bio: string;
  session: { title: string; abstract: string };
  x?: string;
  linkedin?: string;
}

function Feature({ img, title, name, intro, bio, session, x, linkedin }: FeatureProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  const speakerUrl = `/speakers/Speaker?name=${encodeURIComponent(name)}&title=${encodeURIComponent(title)}&intro=${encodeURIComponent(intro)}&bio=${encodeURIComponent(bio)}&sessionTitle=${encodeURIComponent(session.title)}&sessionAbstract=${encodeURIComponent(session.abstract)}&img=${encodeURIComponent(img)}${x ? `&x=${encodeURIComponent(x)}` : ''}${linkedin ? `&linkedin=${encodeURIComponent(linkedin)}` : ''}`;

  return (
    <div className={clsx(styles.featureCard)}>
      <Link to={speakerUrl} className={styles.featureImgContainer}>
        <img className={styles.featureImg} alt={title} src={img} />
      </Link>

      <div className={styles.featureContent}>
        <Link to={speakerUrl} className={styles.featureLink}>
          <h3 className={styles.featureTitle}>{title}</h3>
        </Link>
        <p className={styles.featureIntro}>{intro}</p>
        <Link to={speakerUrl} className={styles.featureSessionLink}>
          <p className={styles.featureSession}>{session.title}</p>
        </Link>

        <div className={styles.socialIcons}>
          {x && (
            <a href={x} target="_blank" rel="noopener noreferrer">
              <img
                className={styles.socialIcon}
                src={useColorMode().colorMode === 'dark' ? X_LOGO_DARK : X_LOGO_LIGHT}
                alt="X Logo"
              />
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <img className={styles.socialIcon}
                src={useColorMode().colorMode === 'dark' ? LINKEDIN_LOGO_DARK : LINKEDIN_LOGO_LIGHT}
                alt="LinkedIn Logo"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Speakers() {
  const speakers: FeatureProps[] = speakerData;

  return (
    <Layout description="Welcome to the Azure Cosmos DB Conf 2025 site">
      <main>
        <section className={styles.speakerSection}>
          <div className={styles.speakerContainer}>
            <h2 className={styles.speakerHeading}>
              Meet the Azure Cosmos DB Conf 2025 speakers.
            </h2>
            <div className={styles.speakerGrid}>
              {speakers.map((props) => (
                <Feature key={props.name} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
