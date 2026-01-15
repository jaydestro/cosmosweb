import React, { useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "../conf.module.css";
import newsData from "../news.json";

interface NewsSectionProps {
  confYear: string;
}

const NewsSection = ({ confYear }: NewsSectionProps) => {
  const [showAllNews, setShowAllNews] = useState(false);

  return (
    <section className={styles.newsSection} aria-labelledby="news-heading">
      <div id="news" className={styles.sectionAnchor} />
      <div className={styles.newsInner}>
        <div className={styles.newsTitleColumn}>
          <img
            className={`${styles.sectionIconImage} ${styles.newsIconImage}`}
            src={useBaseUrl("/img/icons/icon_news.png")}
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
          <h2 id="news-heading" className={styles.newsTitle}>
            Latest news
          </h2>
          <p className={styles.newsDescription}>
            Stay up to date with the latest announcements and updates for Azure Cosmos DB Conf {confYear}.
          </p>
        </div>

        <div className={styles.newsCardsColumn}>
          <div className={styles.newsCards}>
            {newsData
              .slice(0, showAllNews ? newsData.length : 3)
              .map((newsItem, index) => (
                <article key={index} className={styles.newsCard}>
                  <h3 className={styles.newsCardTitle}>{newsItem.title}</h3>
                  <p className={styles.newsDate}>{newsItem.date}</p>
                  <div
                    className={styles.newsCardCopy}
                    dangerouslySetInnerHTML={{ __html: newsItem.content }}
                  />
                </article>
              ))}
          </div>

          {newsData.length > 3 && (
            <div className={styles.newsActions}>
              <button
                type="button"
                onClick={() => setShowAllNews(!showAllNews)}
                className={styles.newsMoreButton}
              >
                {showAllNews ? "Show less" : "Show more"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
