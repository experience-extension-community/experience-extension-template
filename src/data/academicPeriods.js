// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Pattern adapted byte-for-byte from FloridaPoly/exp-account-details-custom
// (src/data/accountDetailsData.js). The Ellucian Experience SDK's
// `authenticatedEthosFetch` takes the pipeline name as a relative
// resource path; the SDK prepends the tenant Ethos host. `cardId`
// is passed as a query parameter (NOT a path segment).

const PIPELINE_NAME =
    process.env.PIPELINE_GET_TERMS || 'eec-template-academic-periods-get';

/**
 * Fetch active academic terms from the configured Data Connect pipeline.
 *
 * @param {object} params
 * @param {Function} params.authenticatedEthosFetch  from useData()
 * @param {string}   params.cardId                   from useCardInfo()
 * @param {string}   [params.pipeline]               override pipeline name
 * @returns {Promise<{status:'success'|'error', data:Array, error?:object}>}
 */
export async function fetchAcademicPeriods({ authenticatedEthosFetch, cardId, pipeline }) {
    const resource = pipeline || PIPELINE_NAME;
    let resourcePath = resource;
    if (cardId) {
        const urlSearchParameters = new URLSearchParams({ cardId }).toString();
        resourcePath = `${resource}?${urlSearchParameters}`;
    }

    try {
        const response = await authenticatedEthosFetch(resourcePath);

        if (response && response.status === 200) {
            const responseText = await response.text();
            const responseObj = JSON.parse(responseText);

            // Unwrap the standard Ethos pipeline response wrapper:
            //   { data: [{ payload: { data: <real payload> } }] }
            let payload;
            if (responseObj.data?.[0]?.payload?.data !== undefined) {
                payload = responseObj.data[0].payload.data;
            } else if (responseObj.data !== undefined) {
                payload = responseObj.data;
            } else {
                payload = responseObj;
            }

            const data = Array.isArray(payload) ? payload : [payload].filter(Boolean);
            return { data, status: 'success' };
        }

        return {
            status: 'error',
            data: [],
            error: { message: 'Server error', statusCode: response?.status },
        };
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Unable to fetch academic periods:', error);
        return {
            status: 'error',
            data: [],
            error: { message: error.message, stack: error.stack },
        };
    }
}
