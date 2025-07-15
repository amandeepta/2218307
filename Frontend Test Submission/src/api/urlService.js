

export const shortenUrls = async (data) => {
  try {
    const res = await fetch('http://localhost:5000/shorturls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls: data }),
    })

    const json = await res.json()

    if (res.ok) {

      return json.shortenedUrls
    } else {

      return null
    }
  } catch {

    return null
  }
}
