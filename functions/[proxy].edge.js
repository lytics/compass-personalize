export default function handler (request) {
    const parsedUrl = new URL(request.url)
    const { searchParams } = parsedUrl

    if (searchParams.has('seer')) {
        const seerValue = searchParams.get('seer')

        const searchString = searchParams.toString()
        // Remove 'seer' from the query params to rewrite the URL
        searchParams.delete('seer')
        const newUrl
      = parsedUrl.origin
      + parsedUrl.pathname
      + (searchString ? '?' + searchString : '')

        // Forward modified request without the 'seer' param
        return fetch(new Request(newUrl, request)).then((res) => {
            const headers = new Headers(res.headers)
            headers.set('seerid', seerValue)
            return new Response(res.body, {
                status: res.status,
                statusText: res.statusText,
                headers
            })
        })
    }

    return fetch(request)
}
