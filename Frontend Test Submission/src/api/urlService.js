import { logActivity } from './log'

export const shortenUrls = async (data) => {
  try {
    const res = await fetch('http://localhost:8000/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls: data }),
    })

    const json = await res.json()

    if (res.ok) {
      await logActivity('frontend', 'info', 'service', `Shortened ${data.length} URL(s) successfully.`)
      return json.shortenedUrls
    } else {
      await logActivity('frontend', 'error', 'service', `Shorten request failed: ${json.message || 'Unknown error'}`)
      return null
    }
  } catch {
    await logActivity('frontend', 'error', 'service', 'Shorten request failed: Network error')
    return null
  }
}
