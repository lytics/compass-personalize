export default function handler (request) {
    const parsedUrl = new URL(request.url)
    const { searchParams } = parsedUrl

    if (searchParams.has('_id')) {
        const idValue = searchParams.get('_id')

        // Remove 'seer' from the query params to rewrite the URL
        searchParams.delete('_id')
        searchParams.set('ts', Date.now().toString()) // cache buster
        const searchString = searchParams.toString()
        const newUrl = `${parsedUrl.origin}${parsedUrl.pathname}${
            searchString ? '?' + searchString : ''
        }`

        // Set a cookie with 'cs-personalize-user-ui'
        const headers = new Headers()
        headers.append('Set-Cookie', `cs-personalize-user-uid=${idValue};`)
        headers.append('Location', newUrl)

        return new Response(null, {
            status: 302, // Temporary redirect
            headers
        })
    }

    return fetch(request)
}
