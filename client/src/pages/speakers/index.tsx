import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './speakers.module.css'; // ✅ Importing separate CSS for speakers
import Link from '@docusaurus/Link';

// 20 unique speaker entries using placeholder data for Kirill
const SpeakerList = [
  {
    title: 'Kirill Gavrylyuk - Microsoft 1',
    name: 'Kirill 1',
    img: '../img/speakers/Kirill_Gavrylyuk.jpg',
    link: 'https://x.com/kirillg_msft',
    intro: 'Product Leader with experience of leading and growing multiple large-scale cloud services...',
    session: {
      title: 'Building Scalable Cloud Services 1',
      abstract: 'An in-depth session on how to build scalable and reliable cloud services...'
    }
  },
  {
    title: 'Kirill Gavrylyuk - Microsoft 2',
    name: 'Kirill 2',
    img: '../img/speakers/Kirill_Gavrylyuk.jpg',
    link: 'https://x.com/kirillg_msft',
    intro: 'Product Leader with experience of leading and growing multiple large-scale cloud services...',
    session: {
      title: 'Building Scalable Cloud Services 2',
      abstract: 'An in-depth session on how to build scalable and reliable cloud services...'
    }
  },
  {
    title: 'Kirill Gavrylyuk - Microsoft 3',
    name: 'Kirill 3',
    img: '../img/speakers/Kirill_Gavrylyuk.jpg',
    link: 'https://x.com/kirillg_msft',
    intro: 'Product Leader with experience of leading and growing multiple large-scale cloud services...',
    session: {
      title: 'Building Scalable Cloud Services 3',
      abstract: 'An in-depth session on how to build scalable and reliable cloud services...'
    }
  },
  {
    title: 'Kirill Gavrylyuk - Microsoft 4',
    name: 'Kirill 4',
    img: '../img/speakers/Kirill_Gavrylyuk.jpg',
    link: 'https://x.com/kirillg_msft',
    intro: 'Product Leader with experience of leading and growing multiple large-scale cloud services...',
    session: {
      title: 'Building Scalable Cloud Services 4',
      abstract: 'An in-depth session on how to build scalable and reliable cloud services...'
    }
  },
  {
    title: 'Kirill Gavrylyuk - Microsoft 5',
    name: 'Kirill 5',
    img: '../img/speakers/Kirill_Gavrylyuk.jpg',
    link: 'https://x.com/kirillg_msft',
    intro: 'Product Leader with experience of leading and growing multiple large-scale cloud services...',
    session: {
      title: 'Building Scalable Cloud Services 5',
      abstract: 'An in-depth session on how to build scalable and reliable cloud services...'
    }
  },
  // Add more speaker entries up to 20...
  {
    title: 'Kirill Gavrylyuk - Microsoft 20',
    name: 'Kirill 20',
    img: '../img/speakers/Kirill_Gavrylyuk.jpg',
    link: 'https://x.com/kirillg_msft',
    intro: 'Product Leader with experience of leading and growing multiple large-scale cloud services...',
    session: {
      title: 'Building Scalable Cloud Services 20',
      abstract: 'An in-depth session on how to build scalable and reliable cloud services...'
    }
  }
];

// Dynamically split speakers into two columns: even index → left, odd index → right
const leftSpeakers = SpeakerList.filter((_, index) => index % 2 === 0);
const rightSpeakers = SpeakerList.filter((_, index) => index % 2 !== 0);

// Speaker card component
function Feature({ img, title, name, intro, session }) {
  return (
    <div className={clsx(styles.featureCard)}>
      <Link 
        to={`/speakers/speaker?name=${encodeURIComponent(name)}&title=${encodeURIComponent(title)}&intro=${encodeURIComponent(intro)}&sessionTitle=${encodeURIComponent(session.title)}&sessionAbstract=${encodeURIComponent(session.abstract)}&img=${encodeURIComponent(img)}`}
        className={styles.featureLink}
      >
        <div className={clsx(styles.featureCardInner)}>
          
          {/* Image Container for Rounded Borders */}
          <div className={clsx(styles.featureImgContainer)}>
            <img className={styles.featureImg} alt={title} src={img} />
          </div>
          
          <div className={styles.featureContent}>
            <h3 className={styles.featureTitle}>{title}</h3>
            <p className={styles.featureIntro}>{intro}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

// Main Speakers Page
export default function Speakers() {
  return (
    <Layout description="Welcome to the Azure Cosmos DB Conf 2025 site">
      <main>
        <section className={styles.speakerSection}>
          <div className={styles.speakerContainer}> {/* ✅ Fix: Centers Heading & Grid */}
            
            {/* ✅ Updated: Centered Heading */}
            <h2 className={styles.speakerHeading}>
              Hear from the Azure Cosmos DB team, your favorite community members, and fresh faces.
            </h2>
            
            {/* 2-column responsive grid */}
            <div className={styles.speakerGrid}>
              {/* Left Column */}
              <div className={styles.speakerColumn}>
                {leftSpeakers.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>

              {/* Right Column */}
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
