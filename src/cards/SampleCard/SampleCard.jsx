// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Sample card.
//
// Boring on purpose. The goal is to demonstrate every relevant SDK
// hook plus the community utilities once each. Replace the body with
// your own content; keep the patterns.

import { useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@ellucian/react-design-system/core';
import { useUserInfo } from '@ellucian/experience-extension-utils';

import { useResolvedTheme, loadIconFont, loadBrandFont } from '../../utils/branding';
import { useEthosFetch, useExtensionConfig, useAnnouncer } from '../../hooks';
import { LoadingState, ErrorState, EmptyState, Icon } from '../../components';
import strings from '../../i18n/en.json';

const interpolate = (template, values) =>
  template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');

export const SampleCard = () => {
  const { palette, spacing } = useResolvedTheme();
  const userInfo = useUserInfo() || {};
  const config = useExtensionConfig({ greetingName: userInfo.firstName || 'there' });
  const announce = useAnnouncer();

  // The template ships without a working endpoint. Set DATA_CONNECT_PIPELINE_URL
  // (or hardcode a URL here) to exercise the Ethos fetch path.
  const fetchUrl = process.env.DATA_CONNECT_PIPELINE_URL || null;
  const { data, isLoading, error, refetch } = useEthosFetch(fetchUrl);

  useEffect(() => {
    loadIconFont();
    loadBrandFont();
  }, []);

  useEffect(() => {
    if (!isLoading && !error && data) announce('Data loaded.');
  }, [isLoading, error, data, announce]);

  return (
    <Card>
      <CardContent>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing.sm,
            marginBottom: spacing.sm,
          }}
        >
          <Icon name="school" size={28} style={{ color: palette.primary }} />
          <Typography variant="h6">{strings['card.sample.title']}</Typography>
        </header>

        <Typography variant="body1" style={{ marginBottom: spacing.sm }}>
          {interpolate(strings['card.sample.greeting'], { firstName: config.greetingName })}
        </Typography>

        <Typography variant="body2" style={{ marginBottom: spacing.md, color: palette.textSecondary }}>
          {strings['card.sample.description']}
        </Typography>

        {isLoading ? <LoadingState /> : null}
        {!isLoading && error ? <ErrorState error={error} onRetry={refetch} /> : null}
        {!isLoading && !error && !data ? (
          <EmptyState
            title={strings['card.sample.empty.title']}
            description={strings['card.sample.empty.description']}
            icon="inbox"
          />
        ) : null}
        {!isLoading && !error && data ? (
          <pre
            style={{
              background: palette.surfaceMuted,
              padding: spacing.sm,
              borderRadius: 4,
              maxHeight: 200,
              overflow: 'auto',
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : null}

        <div style={{ marginTop: spacing.md }}>
          <Button color="primary" onClick={refetch} disabled={!fetchUrl || isLoading}>
            {strings['card.sample.cta']}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
