// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// PageLinkCard — card-to-page navigation.
//
// Demonstrates pageRoute + useCardControl().navigateToPage. The card
// body itself stays trivial — the page (src/pages/SamplePage) does
// the work.

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button, Card, CardContent, Typography } from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20, spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import { useCardControl, useExtensionControl } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';
import { useTypekitFont } from '../../hooks/useTypekitFont';
import { brandColors } from '../../utils/branding/brandColors';
import Icon from '../../components/Icon';

const styles = () => ({
    root: { height: '100%', display: 'flex', flexDirection: 'column' },
    body: { display: 'flex', flexDirection: 'column', gap: spacing20 },
    title: { display: 'flex', alignItems: 'center', gap: 8 },
    titleIcon: { color: brandColors.polyPurple },
    description: { color: brandColors.textSecondary },
    cta: { marginTop: spacing30, alignSelf: 'flex-start' },
});

function PageLinkCard(props) {
    const { classes } = props;
    const intl = useIntl();
    const { setLoadingStatus } = useExtensionControl();
    const { navigateToPage } = useCardControl() || {};

    useTypekitFont();

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
            <link rel="stylesheet" href="https://use.typekit.net/yld8vhe.css" />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0&display=block"
            />
            <IconSprite />
            <CardContent>
                <div className={classes.body}>
                    <Typography variant="h6" className={classes.title}>
                        <Icon name="open_in_new" size={24} className={classes.titleIcon} />
                        {intl.formatMessage({
                            id: 'card.pageLink.title',
                            defaultMessage: 'Open the sample page',
                        })}
                    </Typography>
                    <Typography variant="body2" className={classes.description}>
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
}

PageLinkCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withIntl(PageLinkCard));
