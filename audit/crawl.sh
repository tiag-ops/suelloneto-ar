#!/bin/bash
# Crawl técnico de todas las URLs del sitemap
while read -r url; do
  resp=$(curl -s -o /dev/null -w "%{http_code} %{time_total}s %{size_download}" --max-time 20 "$url")
  title=$(curl -s --max-time 20 "$url" | grep -o "<title>[^<]*</title>" | head -1 | sed 's/<[^>]*>//g')
  canon=$(curl -s --max-time 20 "$url" | grep -o 'rel="canonical" href="[^"]*"' | head -1 | sed 's/.*href="//;s/"//')
  echo "$resp | $url | canon: $canon | $title"
done < urls.txt
