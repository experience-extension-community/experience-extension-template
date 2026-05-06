// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// PageLinkCard — card-to-page navigation.
//
// Demonstrates useCardControl().navigateToPage. The card body itself
// is trivial — the page does the work. Page is declared in
// extension.js; the route registered there is what navigateToPage()
// targets.
//
// Mirrors account-details + custom-simple-links convention: hooks
// for SDK access, withStyles only, no withIntl, <div> wrapper.

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Button, Typography } from '@ellucian/react-design-system/core';
import { spacing20, spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import { useCardControl, useExtensionControl } from '@ellucian/experience-extension-utils';

const styles = () => ({
    root: {
        padding: spacing30,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing20,
    },
    description: {
        color: '#5B5E65',
    },
    cta: {
        alignSelf: 'flex-start',
    },
});

function PageLinkCard({ classes }) {
    const { setLoadingStatus } = useExtensionControl() || {};
    const { navigateToPage } = useCardControl() || {};

    useEffect(() => {
        if (typeof setLoadingStatus === 'function') {
            setLoadingStatus(false);
        }
    }, [setLoadingStatus]);

    const open = () => {
        if (typeof navigateToPage === 'function') {
            navigateToPage({ route: '/' });
        }
    };

    return (
        <div className={classes.root}>
            <IconSprite />
            <Typography variant="h6">Open the sample page</Typography>
            <Typography variant="body2" className={classes.description}>
                Demonstrates page navigation from a card.
            </Typography>
            <Button
                color="primary"
                onClick={open}
                disabled={typeof navigateToPage !== 'function'}
                className={classes.cta}
            >
                Open page
            </Button>
        </div>
    );
}

PageLinkCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageLinkCard);
