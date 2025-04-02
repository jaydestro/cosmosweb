import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Azure Cosmos DB Conf 2025',
  tagline: 'Infinite Scale, Instant Impact!',
  favicon: 'img/favicon.ico',

  url: 'https://azurecosmosdb.github.io',
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
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        disableInDev: false,
      },
    ],
  ],
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Developer Home',
      logo: {
        alt: 'Azure Cosmos DB Conf 2025',
        src: 'img/logo.svg',
      },
      items: [
        { label: 'Gallery', position: 'left', href: 'https://azurecosmosdb.github.io/gallery/' },
        {
          to: '/conf',
          type: 'dropdown',
          label: 'Azure Cosmos DB Conf',
          position: 'left',
          items: [
            { label: 'Conf Home', to: '/conf', className: 'mobile-only' },
            { label: 'News', to: '/conf#news' },
            { label: 'About Azure Cosmos DB Conf', to: '/conf#about' },
            { label: 'Register', href: 'https://developer.microsoft.com/en-us/reactor/events/24779/' },
            { label: 'Agenda', to: '/agenda' },
            { label: 'Speakers', to: '/speakers' },
            { label: 'Archive', href: '/archive' },
            { label: 'FAQ', to: '/conf#faq-section' },
            { label: 'Socials', to: '/conf#faq-section' },
            { label: 'Code Of Conduct', to: '/coc' },
          ],
        },
        { label: 'Community', position: 'left', to: '/community' },
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
            { label: 'Stack Overflow', href: 'https://stackoverflow.com/tags/azure-cosmosdb/info' },
            { label: 'Youtube', href: 'https://www.youtube.com/@AzureCosmosDB' },
            { label: 'X', href: 'https://x.com/azurecosmsodb' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/company/azure-cosmos-db' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: 'https://devblogs.microsoft.com/cosmosdb/' },
            { label: 'GitHub', href: 'https://github.com/AzureCosmosDB' },
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
        content: 'Welcome to the Azure Cosmos DB Conf 2025!',
      },
    ],

    announcementBar: {
      id: 'Add Your Project!',
      content:
        'Join us for <b><a href="https://aka.ms/AzureCosmosDBConf">Azure Cosmos DB Conf</a></b> on April 15 | <b><a href="https://aka.ms/RegisterAzureCosmosDBConf">Click here to register</a></b> with Microsoft Reactor for updates.',
      backgroundColor: '#50E6FF',
      textColor: '#552F99',
      isCloseable: false,
    },

    gtag: {
      trackingID: 'G-06VJPSGDCQ',
      anonymizeIP: true,
    },
  },
};

export default config;
