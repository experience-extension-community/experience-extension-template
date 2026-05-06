// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Pattern adapted byte-for-byte from FloridaPoly/exp-account-details-custom
// (src/data/accountDetailsData.js).

const PIPELINE_NAME =
    process.env.PIPELINE_GET_PERSONS || 'eec-template-persons-get';

/**
 * Fetch the signed-in user's persons record from the configured pipeline.
 *
 * @param {object} params
 * @param {Function} params.authenticatedEthosFetch  from useData()
 * @param {string}   params.cardId                   from useCardInfo()
 * @param {string}   [params.pipeline]               override pipeline name
 * @returns {Promise<{status:'success'|'error', data:object|null, error?:object}>}
 */
export async function fetchPersons({ authenticatedEthosFetch, cardId, pipeline }) {
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

            let payload;
            if (responseObj.data?.[0]?.payload?.data !== undefined) {
                payload = responseObj.data[0].payload.data;
            } else if (responseObj.data !== undefined) {
                payload = responseObj.data;
            } else {
                payload = responseObj;
            }

            return { data: payload, status: 'success' };
        }

        return {
            status: 'error',
            data: null,
            error: { message: 'Server error', statusCode: response?.status },
        };
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Unable to fetch persons:', error);
        return {
            status: 'error',
            data: null,
            error: { message: error.message, stack: error.stack },
        };
    }
}
