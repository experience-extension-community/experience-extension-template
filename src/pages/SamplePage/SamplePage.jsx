// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import { useEffect } from 'react';
import { Typography } from '@ellucian/react-design-system/core';
import { useUserInfo } from '@ellucian/experience-extension-utils';

import { useResolvedTheme, loadIconFont, loadBrandFont } from '../../utils/branding';
import { Icon } from '../../components';
import strings from '../../i18n/en.json';

export const SamplePage = () => {
  const { spacing, palette } = useResolvedTheme();
  const userInfo = useUserInfo() || {};

  useEffect(() => {
    loadIconFont();
    loadBrandFont();
  }, []);

  return (
    <main
      style={{
        padding: spacing.lg,
        maxWidth: 960,
        margin: '0 auto',
        color: palette.textPrimary,
      }}
    >
      <header style={{ display: 'flex', gap: spacing.sm, alignItems: 'center' }}>
        <Icon name="dashboard" size={32} style={{ color: palette.primary }} />
        <Typography variant="h4">{strings['page.sample.title']}</Typography>
      </header>
      <Typography variant="body1" style={{ marginTop: spacing.md }}>
        {strings['page.sample.intro']}
      </Typography>
      {userInfo.firstName ? (
        <Typography variant="body2" style={{ marginTop: spacing.sm, color: palette.textSecondary }}>
          Signed in as {userInfo.firstName} {userInfo.lastName}.
        </Typography>
      ) : null}
    </main>
  );
};
