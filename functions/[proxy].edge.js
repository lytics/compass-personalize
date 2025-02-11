export default function handler (request) {
    const parsedUrl = new URL(request.url)
    const { searchParams } = parsedUrl

    let response

    if (searchParams.has('seer')) {
        const seerValue = searchParams.get('seer')

        // Remove 'seer' from the query params to rewrite the URL
        searchParams.delete('seer')
        const newUrl
      = parsedUrl.origin + parsedUrl.pathname + searchParams.toString()

        // Forward modified request without the 'seer' param
        response = fetch(new Request(newUrl, request))

        // Set a cookie in the response headers
        response = new Response(response.body, response)
        response.headers.set(
            'Set-Cookie',
            `seerid=${seerValue}; Path=/; SameSite=Lax`
        )
        return response
    }

    return fetch(request)
}
