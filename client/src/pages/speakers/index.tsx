import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from '../index.module.css';
import Link from '@docusaurus/Link';

const SpeakerList = [
  {
    title: 'Kirill Gavrylyuk - Microsoft',
    name: 'Kirill',
    img: '../img/speakers/Kirill_Gavrylyuk.jpg',
    link: 'https://x.com/kirillg_msft',
    intro: 'Product Leader with experience of leading and growing multiple large scale cloud services...',
    session: {
      title: 'Building Scalable Cloud Services',
      abstract: 'An in-depth session on how to build scalable and reliable cloud services...'
    }
  }  
];

function Feature({ img, title, name, intro, session }) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <Link 
        to={`/speakers/speaker?name=${encodeURIComponent(name)}&title=${encodeURIComponent(title)}&intro=${encodeURIComponent(intro)}&sessionTitle=${encodeURIComponent(session.title)}&sessionAbstract=${encodeURIComponent(session.abstract)}&img=${encodeURIComponent(img)}`}
        className={styles.featureLink}
      >
        <div className={clsx('shadow-lg rounded-lg overflow-hidden', styles.featureCard)}>
          <img className={clsx('w-full', styles.featureImg)} alt={title} src={img} />
          <div className={clsx('p-4 bg-white', styles.featureContent)}>
            <h3 className={clsx('text-xl font-semibold text-blue-700', styles.featureTitle)}>{title}</h3>
            <p className={clsx('text-gray-600', styles.featureIntro)}>{intro}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Speakers() {
  return (
    <Layout description="Welcome to the Azure Cosmos DB Conf 2025 site">
      <main>
        <section className={clsx('py-12 bg-blue-50', styles.speakerSection)}>
          <div className="container mx-auto text-center">
            <h2 className={clsx('text-4xl font-bold text-blue-800 mb-8', styles.heading)}>Hear from the Azure Cosmos DB team, your favorite community members, and fresh faces.</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {SpeakerList.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
