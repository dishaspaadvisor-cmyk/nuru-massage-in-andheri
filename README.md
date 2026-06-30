# Unicorn Spa SEO Site

## Vercel Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=spa_seo_analytics
NEXT_PUBLIC_WHATSAPP_NUMBER=919000000000
NEXT_PUBLIC_PHONE_NUMBER=+91 90000 00000
NEXT_PUBLIC_GOOGLE_MAP_URL=https://www.google.com/maps/search/?api=1&query=Sakinaka, Andheri%20Maharashtra
```

## Analytics Storage

The analytics database stores only conversion clicks:

- `whatsapp_click`
- `phone_click`
- `direction_click`

It does not store page views, scroll depth, user agent, IP, screen size, or referrer.

## Analytics Reports

Weekly:

```txt
/api/analytics/track?range=weekly
```

Monthly:

```txt
/api/analytics/track?range=monthly
```

Custom:

```txt
/api/analytics/track?range=custom&from=2026-06-01&to=2026-06-30
```

The report returns totals and daily counts for WhatsApp, Call, and Direction clicks.
