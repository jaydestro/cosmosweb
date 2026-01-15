import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./conf.module.css";
import {
  FaBookOpen,
  FaCalendarCheck,
  FaClipboardList,
  FaFileLines,
  FaDiscord,
  FaGithub,
  FaLinkedinIn,
  FaStackOverflow,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

type ConfFooterProps = {
  confYear?: string;
};

export default function ConfFooter({ confYear = "2026" }: ConfFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.confFooter}>
      <div className={styles.confFooterInner}>
        <div className={styles.confFooterTop}>
          <div className={styles.confFooterLogo}>
            <img
              className={styles.confFooterLogoMark}
              src={useBaseUrl("/img/logo.svg")}
              alt="Azure Cosmos DB"
              width={72}
              height={72}
              loading="lazy"
            />
            <div className={styles.confFooterLogoText}>
              <div className={styles.confFooterLogoLine}>Azure Cosmos DB</div>
              <div className={styles.confFooterLogoLine}>
                Conf <span className={styles.confFooterYear}>{confYear}</span>
              </div>
            </div>
          </div>

          <div className={styles.confFooterLinks}>
            <div className={styles.confFooterColumn}>
              <div className={styles.confFooterColumnTitle}>Docs</div>
              <a
                className={styles.confFooterLink}
                href="https://learn.microsoft.com/azure/cosmos-db/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaFileLines />
                </span>
                <span>Azure Cosmos DB </span>
              </a>
              <a
                className={styles.confFooterLink}
                href="https://learn.microsoft.com/azure/documentdb/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaFileLines />
                </span>
                <span>Azure DocumentDB (with MongoDB compatibility) </span>
              </a>
              <a
                className={styles.confFooterLink}
                href="https://documentdb.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaFileLines />
                </span>
                <span>Open Source DocumentDB</span>
              </a>
            </div>

            <div className={styles.confFooterColumn}>
              <div className={styles.confFooterColumnTitle}>Community</div>
              <a
                className={styles.confFooterLink}
                href="https://www.linkedin.com/company/azure-cosmos-db"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaLinkedinIn />
                </span>
                <span>LinkedIn</span>
              </a>
              <a
                className={styles.confFooterLink}
                href="http://aka.ms/AzureCosmosDBYouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaYoutube />
                </span>
                <span>YouTube</span>
              </a>
              <a
                className={styles.confFooterLink}
                href="https://discord.gg/yKnQqWgg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaDiscord />
                </span>
                <span>Discord</span>
              </a>
              <a
                className={styles.confFooterLink}
                href="https://x.com/azurecosmosdb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaXTwitter />
                </span>
                <span>X</span>
              </a>
              <a
                className={styles.confFooterLink}
                href="https://stackoverflow.com/tags/azure-cosmosdb/info"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaStackOverflow />
                </span>
                <span>Stack Overflow</span>
              </a>
            </div>

            <div className={styles.confFooterColumn}>
              <div className={styles.confFooterColumnTitle}>More</div>
              <a
                className={styles.confFooterLink}
                href="https://aka.ms/cosmosconfreg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaCalendarCheck />
                </span>
                <span>Register for free</span>
              </a>
              <a
                className={styles.confFooterLink}
                href="https://aka.ms/cosmosconfcfp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaClipboardList />
                </span>
                <span>Call for Proposals</span>
              </a>
              <a
                className={styles.confFooterLink}
                href="https://devblogs.microsoft.com/cosmosdb/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaBookOpen />
                </span>
                <span>Blog</span>
              </a>
              <a
                className={styles.confFooterLink}
                href="https://github.com/AzureCosmosDB"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaGithub />
                </span>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.confFooterBottom}>
          <p className={styles.confFooterCopyright}>
            Copyright © {currentYear} Azure Cosmos DB - Built with ❤️{"\u00A0"}
          </p>
        </div>
      </div>
    </footer>
  );
}
