export default function handler (request) {
    const parsedUrl = new URL(request.url)
    const { searchParams } = parsedUrl

    if (searchParams.has('seer')) {
        const seerValue = searchParams.get('seer')

        // Remove 'seer' from the query params to rewrite the URL
        searchParams.delete('seer')
        const newUrl
      = parsedUrl.origin + parsedUrl.pathname + searchParams.toString()

        // Forward modified request without the 'seer' param
        return fetch(new Request(newUrl, request)).then((res) => {
            return new Response(res.body, {
                ...res,
                headers: {
                    ...res.headers,
                    seerid: seerValue
                }
            })
        })
    }

    return fetch(request)
}
