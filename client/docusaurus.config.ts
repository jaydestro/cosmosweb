import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

function readBool(envValue: string | undefined, defaultValue: boolean): boolean {
  if (envValue == null) return defaultValue;

  const normalized = envValue.trim().toLowerCase();
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false;

  return defaultValue;
}

function readString(envValue: string | undefined): string | null {
  const value = envValue?.trim();
  return value ? value : null;
}

const config: Config = {
  title: 'Azure Cosmos DB Dev Home',
  tagline: 'Infinite Scale, Instant Impact!',
  favicon: 'img/favicon.ico',

  url: 'https://developer.azurecosmosdb.com',
  baseUrl: '/',

  organizationName: 'azurecosmosdb',
  projectName: 'azurecosmosdbconf',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-google-analytics',
      {
        trackingID: 'G-06VJPSGDCQ',
        anonymizeIP: true,
      },
    ],
  ],

  // Values here are serialized into the client bundle and are safe to read in the browser.
  // Use these for `/conf` feature toggles so we don't rely on `process` being defined client-side.
  customFields: (() => {
    const conf: Record<string, unknown> = {};

    // Only set overrides when the env var is explicitly provided.
    // Defaults live in `src/pages/conf/confSettings.json`.
    if (process.env.CONF_SHOW_STREAM !== undefined) {
      conf.showStream = readBool(process.env.CONF_SHOW_STREAM, true);
    }
    if (process.env.CONF_SHOW_AGENDA !== undefined) {
      conf.showAgenda = readBool(process.env.CONF_SHOW_AGENDA, true);
    }
    if (process.env.CONF_STREAM_EMBED_URL !== undefined) {
      conf.streamEmbedUrl = readString(process.env.CONF_STREAM_EMBED_URL);
    }

    return { conf };
  })(),

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Developer Home',
      logo: {
        alt: 'Azure Cosmos DB Dev Home',
        src: 'img/logo.svg',
      },
      items: [
        {
          label: 'Gallery',
          position: 'left',
          href: 'https://azurecosmosdb.github.io/gallery/',
        },
        {
          to: '/conf',
          type: 'dropdown',
          label: 'Azure Cosmos DB Conf',
          position: 'left',
          items: [
            {
              label: 'Conf Home',
              to: '/conf',
              activeBaseRegex: '^/conf/?$',
              className: 'mobile-only',
            },
            {
              label: 'News',
              to: '/conf#news',
              // Hash anchors don't reliably work with activeBaseRegex; omit.
            },
            {
              label: 'About Azure Cosmos DB Conf',
              to: '/conf#about',
              activeBaseRegex: '^/conf#about$',
            },
            {
              label: 'Register',
              href: 'https://aka.ms/cosmosconfreg',
              // no activeBaseRegex needed
         },
            // {
            //   label: 'Agenda',
            //   to: '/agenda',
            //   activeBaseRegex: '^/agenda/?$',
            // },
           // {
           //   label: 'Speakers',
           //   to: '/speakers',
           //   activeBaseRegex: '^/speakers/?$',
           // },
          //{
           //   label: 'Customer Interviews',
          //    to: '/speakers/interviews',
          //    activeBaseRegex: '^/speakers/interviews/?$',
          //  },
            {
              label: 'Resources',
              to: '/conf/resources',
              activeBaseRegex: '^/conf/resources/?$',
            },
            {
              label: 'Archive',
              href: '/archive',
              activeBaseRegex: '^/archive/?$',
            },
            {
              label: 'FAQ',
              to: '/conf#faq-section',
              activeBaseRegex: '^/conf#faq-section$',
            },
            {
              label: 'Socials',
              to: '/conf#faq-section',
              activeBaseRegex: '^/conf#faq-section$',
            },
            {
              label: 'Code Of Conduct',
              to: '/coc',
              activeBaseRegex: '^/coc/?$',
            },
          ],
        },
        {
          label: 'Community',
          position: 'left',
          to: '/community',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: 'https://learn.microsoft.com/en-us/azure/cosmos-db/introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/tags/azure-cosmosdb/info',
            },
            {
              label: 'YouTube',
              href: 'http://aka.ms/AzureCosmosDBYouTube',
            },
            {
              label: 'X',
              href: 'https://x.com/azurecosmosdb',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/azure-cosmos-db',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'https://devblogs.microsoft.com/cosmosdb/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/AzureCosmosDB',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Azure Cosmos DB - Built with ❤️ &nbsp; `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    metadata: [
      {
        name: 'twitter:card',
        content: 'Azure Cosmos DB Dev Home',
      },
    ],
  },
};

export default config;
