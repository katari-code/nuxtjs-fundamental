export default function (context, inject) {
    const appId = "I631M47KD6"
    const apiKey = "c88a4f2828c5bd3ecd9fdd60ab7d187d"
    const headers = {
        "X-Algolia-API-Key": apiKey,
        "X-Algolia-Application-Id": appId,
    }
    inject('dataApi', {
        getHome,
        getReviewsByHomeID,
        getUserByHomeId,
        getHomesByLocation,
    })
    async function getHome(homeId) {
        try {
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/home/${homeId}`, { headers }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function unWrap(response) {
        const json = await response.json()
        const { ok, status, statusText } = response
        return {
            json,
            ok,
            status,
            statusText,
        }
    }

    async function getReviewsByHomeID(homeId) {
        try {
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/reviews/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    hitsPerPage: 6,
                    attributesToHighlight: [],
                })
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getUserByHomeId(homeId) {
        try {
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    attributesToHighlight: [],
                })
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getHomesByLocation(lat, lng, radiusInMeters = 1500 * 15) {
        try {
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    aroundLatLng: `${lat},${lng}`,
                    aroundRadius: radiusInMeters,
                    hitsPerPage: 10,
                    attributesToHighlight: [],
                })
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    

    function getErrorResponse(error) {
        return {
            ok: false,
            status: 500,
            statusText: error.message,
            json: {}
        }
    }
}
