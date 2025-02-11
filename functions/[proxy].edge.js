export default function handler (request) {
    const parsedUrl = new URL(request.url)
    const { searchParams } = parsedUrl

    if (searchParams.has('seer')) {
        const seerValue = searchParams.get('seer')

        // Remove 'seer' from the query params to rewrite the URL
        searchParams.delete('seer')
        const searchString = searchParams.toString()
        const newUrl = `${parsedUrl.origin}${parsedUrl.pathname}${
            searchString ? '?' + searchString : ''
        }`

        // Set a cookie with 'seerid'
        const headers = new Headers()
        headers.append(
            'Set-Cookie',
            `seerid=${seerValue}; Domain=.${parsedUrl.hostname};;`
        + `cs-personalize-user-uid=${seerValue};`
        )
        headers.append('Location', newUrl)

        return new Response(null, {
            status: 302, // Temporary redirect
            headers
        })
    }

    return fetch(request)
}
