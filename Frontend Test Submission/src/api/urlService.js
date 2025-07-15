export const shortenUrls = async (data) => {
  const results = [];

  for (let d of data) {
    try {
      const res = await fetch('http://localhost:5000/shorturls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: d.longUrl,
          validity: d.validityInMinutes,
          shortcode: d.shortcode,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        results.push({
          shortUrl: json.shortLink,
          expiresAt: json.expiry,
        });
      }
    } catch (err) {
      console.error("Request failed:", err);
    }
  }

  return results;
};
