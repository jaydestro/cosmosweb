import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./conf.module.css";

type ConfFooterProps = {
  confYear?: string;
};

// External link / open-in-new-tab icon (matches Figma node 6:22 "Open")
function ExternalLinkIcon() {
  return (
    <svg
      className={styles.confFooterLinkIcon}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 1H11M11 1V5M11 1L5 7M4.5 2H2C1.44772 2 1 2.44772 1 3V10C1 10.5523 1.44772 11 2 11H9C9.55228 11 10 10.5523 10 10V7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ConfFooter({ confYear = "2026" }: ConfFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.confFooter} data-node-id="6:850">
      <div className={styles.confFooterInner}>

        {/* ── Top row: logo + link columns ── */}
        <div className={styles.confFooterTop}>

          {/* Logo block — Figma node 6:941 */}
          <div className={styles.confFooterLogo} data-node-id="6:941">
            <img
              className={styles.confFooterLogoMark}
              src={useBaseUrl("/img/conf/footer_logo_mark.svg")}
              alt=""
              aria-hidden="true"
              width={106}
              height={106}
              loading="lazy"
            />
            <img
              className={`${styles.confFooterWordmark} ${styles.confFooterWordmarkLight}`}
              src={useBaseUrl("/img/conf/footer_wordmark_light.svg")}
              alt={`Azure Cosmos DB Conf ${confYear}`}
              width={287}
              height={77}
              loading="lazy"
            />
            <img
              className={`${styles.confFooterWordmark} ${styles.confFooterWordmarkDark}`}
              src={useBaseUrl("/img/conf/footer_wordmark_dark.svg")}
              alt=""
              aria-hidden="true"
              width={287}
              height={77}
              loading="lazy"
            />
          </div>

          {/* Link columns */}
          <div className={styles.confFooterLinks} data-node-id="6:974">

            {/* Docs */}
            <div className={styles.confFooterColumn} data-node-id="6:852">
              <div className={styles.confFooterColumnTitle}>Docs</div>
              <a
                className={styles.confFooterLink}
                href="https://learn.microsoft.com/azure/cosmos-db/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Azure Cosmos DB</span>
                <ExternalLinkIcon />
              </a>
              <a
                className={styles.confFooterLink}
                href="https://learn.microsoft.com/azure/documentdb/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Azure DocumentDB (with MongoDB compatibility)</span>
                <ExternalLinkIcon />
              </a>
              <a
                className={styles.confFooterLink}
                href="https://documentdb.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Open Source DocumentDB</span>
                <ExternalLinkIcon />
              </a>
            </div>

            {/* Community */}
            <div className={styles.confFooterColumn} data-node-id="6:885">
              <div className={styles.confFooterColumnTitle}>Community</div>
              <a
                className={styles.confFooterLink}
                href="https://www.linkedin.com/company/azure-cosmos-db"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>LinkedIn</span>
                <ExternalLinkIcon />
              </a>
              <a
                className={styles.confFooterLink}
                href="http://aka.ms/AzureCosmosDBYouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>YouTube</span>
                <ExternalLinkIcon />
              </a>
              <a
                className={styles.confFooterLink}
                href="https://discord.gg/yKnQqWgg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Discord</span>
                <ExternalLinkIcon />
              </a>
              <a
                className={styles.confFooterLink}
                href="https://x.com/azurecosmosdb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>X</span>
                <ExternalLinkIcon />
              </a>
              <a
                className={styles.confFooterLink}
                href="https://stackoverflow.com/tags/azure-cosmosdb/info"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Stack Overflow</span>
                <ExternalLinkIcon />
              </a>
            </div>

            {/* More */}
            <div className={styles.confFooterColumn} data-node-id="6:889">
              <div className={styles.confFooterColumnTitle}>More</div>
              <a
                className={styles.confFooterLink}
                href="https://devblogs.microsoft.com/cosmosdb/"
                target="_blank"
                rel="noopener noreferrer"
                data-node-id="6:931"
              >
                <span>Blog</span>
                <ExternalLinkIcon />
              </a>
              <a
                className={styles.confFooterLink}
                href="https://github.com/AzureCosmosDB"
                target="_blank"
                rel="noopener noreferrer"
                data-node-id="6:936"
              >
                <span>GitHub</span>
                <ExternalLinkIcon />
              </a>
            </div>

          </div>
        </div>

        {/* ── AMD partnership ── */}
        <div className={styles.confFooterPartnership} data-node-id="419:111">
          <p className={styles.confFooterPartnershipLabel}>In partnership with</p>
          <img
            className={styles.confFooterPartnershipLogo}
            src={useBaseUrl("/img/conf/amd-logo.svg")}
            alt="AMD"
            loading="lazy"
          />
        </div>

        {/* ── Copyright ── */}
        <div className={styles.confFooterBottom}>
          <p className={styles.confFooterCopyright}>
            Copyright © {currentYear} Azure Cosmos DB · Built with ❤️
          </p>
        </div>

      </div>
    </footer>
  );
}
