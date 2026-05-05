// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// PageLinkCard — card-to-page navigation.
//
// Demonstrates:
//   * pageRoute declared in extension.js
//   * useCardControl().navigateToPage to imperatively launch the page
//   * The card body itself stays trivial — the page does the work
//
// HOC composition: withStyles(styles)(withIntl(Card)) — withStyles outermost.

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button, Card, CardContent, Typography } from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20, spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import { useCardControl, useExtensionControl } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';
import { useResolvedTheme } from '../../utils/branding/theme';
import { useTypekitFont } from '../../hooks/useTypekitFont';
import { useMaterialIconFonts } from '../../hooks/useMaterialIconFonts';
import Icon from '../../components/Icon';

const styles = () => ({
    root: { height: '100%', display: 'flex', flexDirection: 'column' },
    body: { display: 'flex', flexDirection: 'column', gap: spacing20 },
    cta: { marginTop: spacing30, alignSelf: 'flex-start' },
});

const PageLinkCard = ({ classes }) => {
    const intl = useIntl();
    const { palette } = useResolvedTheme();
    const { setLoadingStatus } = useExtensionControl();
    const { navigateToPage } = useCardControl() || {};

    useTypekitFont();
    useMaterialIconFonts();

    useEffect(() => {
        setLoadingStatus(false);
    }, [setLoadingStatus]);

    const open = () => {
        if (typeof navigateToPage === 'function') {
            navigateToPage({ route: '/' });
        }
    };

    return (
        <Card className={classes.root}>
            <IconSprite />
            <CardContent>
                <div className={classes.body}>
                    <Typography
                        variant="h6"
                        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                    >
                        <Icon name="open_in_new" size={24} style={{ color: palette.primary }} />
                        {intl.formatMessage({
                            id: 'card.pageLink.title',
                            defaultMessage: 'Open the sample page',
                        })}
                    </Typography>
                    <Typography variant="body2" style={{ color: palette.textSecondary }}>
                        {intl.formatMessage({
                            id: 'card.pageLink.description',
                            defaultMessage: 'Demonstrates page navigation from a card.',
                        })}
                    </Typography>
                    <Button
                        className={classes.cta}
                        color="primary"
                        onClick={open}
                        disabled={typeof navigateToPage !== 'function'}
                    >
                        {intl.formatMessage({
                            id: 'card.pageLink.cta',
                            defaultMessage: 'Open page',
                        })}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

PageLinkCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withIntl(PageLinkCard));
