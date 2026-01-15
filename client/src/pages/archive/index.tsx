import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './archive.module.css';

const timelineData = [
  {
    year: '2025',
    text: 'Azure Cosmos DB Conf 2025',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLmamF3YkHLoLQhnFsKWhtKu_Tp0uXPFdn',
  },
  {
    year: '2024',
    text: 'Azure Cosmos DB Conf 2024',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLlrxD0HtieHgQxPGa9JJdbbUpmkuIshh4',
  },
  {
    year: '2023',
    text: 'Azure Cosmos DB Conf 2023',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLmamF3YkHLoLd5dQ0aji5QRhxQQAh0SIn',
  },
  {
    year: '2022',
    text: 'Azure Cosmos DB Conf 2022',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLmamF3YkHLoLa2ELTHUhoSMx89w329bOD',
  },
  {
    year: '2021',
    text: 'Azure Cosmos DB Conf 2021',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLmamF3YkHLoLN_24E41jSPVilv5B3GTBg',
  },
];

export default function TimelinePage() {
  return (
    <Layout title="Archive" description="Azure Cosmos DB Conf playlists from 2021 to 2025">
      <div className={styles.pageWrapper}>
        <header className={styles.hero} data-node-id="126:78">
          <div className={styles.heroInner} data-node-id="126:79">
            <div className={styles.heroLogoRow} data-node-id="126:80">
              <picture>
                <source
                  srcSet={useBaseUrl("/img/conf/hero_logo_mark.avif")}
                  type="image/avif"
                />
                <source
                  srcSet={useBaseUrl("/img/conf/hero_logo_mark.webp")}
                  type="image/webp"
                />
                <img
                  className={styles.heroLogoMark}
                  src={useBaseUrl("/img/conf/hero_logo_mark.png")}
                  alt=""
                />
              </picture>
              <picture>
                <source
                  srcSet={useBaseUrl("/img/conf/hero_logo_wordmark.avif")}
                  type="image/avif"
                />
                <source
                  srcSet={useBaseUrl("/img/conf/hero_logo_wordmark.webp")}
                  type="image/webp"
                />
                <img
                  className={styles.heroWordmarkImage}
                  src={useBaseUrl("/img/conf/hero_logo_wordmark.png")}
                  alt="Azure Cosmos DB Conf 2026"
                />
              </picture>
            </div>
            <p className={styles.heroDate} data-node-id="126:112">
              April 28 - 9:00 AM - 12:00 PM PT
            </p>
          </div>
          <span className={styles.srOnly}>Azure Cosmos DB Conf Archive</span>
        </header>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <img src="/img/planet-1.png" alt="" aria-hidden="true" className={styles.icon} />
            Azure Cosmos DB Conf Archive
          </h1>
          <div className={styles.timeline}>
            {timelineData.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineContent}>
                  <p className={styles.timelineText}>{item.text}</p>
                  <iframe
                    className={styles.timelineVideo}
                    src={item.embedUrl}
                    title={`Azure Cosmos DB Conf ${item.year} playlist`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
