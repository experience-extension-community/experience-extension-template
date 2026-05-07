// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Stripped to bare minimum to isolate render-time failures. If this
// renders, the routing layer is fine and we can layer SDK hooks
// (useUserInfo, useDashboardInfo, etc.) back in one at a time.

import React from 'react';

const SamplePage = () => {

    return (
        <div style={{ padding: 32, fontFamily: 'sans-serif' }}>
            <h1>Sample page</h1>
            <p>If you can see this, the page module mounted successfully.</p>
        </div>
    )

}



export default SamplePage;
