// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Ellucian Experience extension manifest.
//
// EVERY field marked TODO must be replaced before publishing this
// extension. See REPLACE_THESE.md at the repo root.

import { SampleCard } from './cards/SampleCard';
import { SamplePage } from './pages/SamplePage';

const extension = {
  name: 'experience-extension-template', // TODO: replace with your extension's slug
  publisher: 'experience-extension-community', // TODO: replace with your institution
  cards: [
    {
      type: 'SampleCard',
      source: SampleCard,
      title: 'Sample Card',
      displayCardType: 'Sample Card',
      description:
        'A boring-but-exemplary card that demonstrates the community framework. Replace before shipping.',
      configuration: {
        client: [
          {
            key: 'greetingName',
            label: 'Greeting fallback name',
            type: 'text',
            required: false,
          },
        ],
        server: [],
      },
    },
  ],
  page: {
    source: SamplePage,
  },
};

export default extension;
