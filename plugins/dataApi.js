export default function (context, inject) {
    const appId = "I631M47KD6"
    const apiKey = "c88a4f2828c5bd3ecd9fdd60ab7d187d"

    inject('dataApi', {
        getHome,
    })
    async function getHome(homeId) {
        const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/home/${homeId}`, {
            headers: {
                "X-Algolia-API-Key": apiKey,
                "X-Algolia-Application-Id": appId,
            }
        })
        const json = await response.json()
        return json
    }
}