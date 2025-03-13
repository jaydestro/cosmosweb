import React from 'react';
import Layout from '@theme/Layout';
import styles from './archive.module.css';

const timelineData = [
  { year: '2024', text: 'Azure Cosmos DB conf 2024', video: 'https://www.youtube.com/watch?v=D-nknTYX0-w&list=PLlrxD0HtieHgQxPGa9JJdbbUpmkuIshh4' },
  { year: '2023', text: 'Azure Cosmos DB conf 2023', video: 'https://www.youtube.com/playlist?list=PLmamF3YkHLoLd5dQ0aji5QRhxQQAh0SIn' },
  { year: '2022', text: 'Azure Cosmos DB conf 2022', video: 'https://youtube.com/playlist?list=PLmamF3YkHLoLa2ELTHUhoSMx89w329bOD&si=Genzse5fz73sFc7v' },
  { year: '2021', text: 'Azure Cosmos DB conf 2021', video: 'https://www.youtube.com/playlist?list=PLmamF3YkHLoLN_24E41jSPVilv5B3GTBg' },

];

export default function TimelinePage() {
  return (
    <Layout title="Timeline" description="Play Lists from 2021 to 2024">
      <div className={styles.container}>
        <h1 className={styles.title}>Azure Cosmsos DB Conf Archive</h1>
        <div className={styles.timeline}>
          {timelineData.map((item, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineYear}>{item.year}</div>
              <div className={styles.timelineContent}>
                <p>{item.text}</p>
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${item.video}`}
                  title={`Video for ${item.year}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
