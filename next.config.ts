import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/ko", permanent: false },
      { source: "/index", destination: "/ko", permanent: true },
      { source: "/contact", destination: "/ko/contact", permanent: true },
      { source: "/18", destination: "/ko/about", permanent: true },
      { source: "/19", destination: "/ko/about/history", permanent: true },
      { source: "/20", destination: "/ko/about/vision", permanent: true },
      { source: "/21", destination: "/ko/about/abbot", permanent: true },
      { source: "/22", destination: "/ko/about/halls", permanent: true },
      { source: "/23", destination: "/ko/about/directions", permanent: true },
      { source: "/24", destination: "/ko/prayer", permanent: true },
      { source: "/25", destination: "/ko/prayer/dalmasa-practitioner", permanent: true },
      { source: "/26", destination: "/ko/prayer/daily", permanent: true },
      { source: "/27", destination: "/ko/prayer/special", permanent: true },
      { source: "/28", destination: "/ko/prayer/memorial-rites", permanent: true },
      { source: "/29", destination: "/ko/prayer/gongyang", permanent: true },
      { source: "/31", destination: "/ko/events", permanent: true },
      { source: "/32", destination: "/ko/events/major", permanent: true },
      { source: "/33", destination: "/ko/events/regular-services", permanent: true },
      { source: "/34", destination: "/ko/education", permanent: true },
      { source: "/35", destination: "/ko/education/foundations", permanent: true },
      { source: "/36", destination: "/ko/news", permanent: true },
      { source: "/37", destination: "/ko/news/notices", permanent: true },
      { source: "/38", destination: "/ko/news/stories", permanent: true },
      { source: "/39", destination: "/ko/news/volunteer", permanent: true },
      { source: "/40", destination: "/ko/memorial", permanent: true },
      { source: "/41", destination: "/ko/memorial/about", permanent: true },
      { source: "/42", destination: "/ko/memorial/enshrinement", permanent: true },
      { source: "/43", destination: "/ko/memorial/remembrance", permanent: true },
      { source: "/44", destination: "/ko/prayer/monthly", permanent: true },
      { source: "/45", destination: "/ko/education/buddhist-college", permanent: true },
      { source: "/46", destination: "/ko/education/sutra-study", permanent: true },
      { source: "/47", destination: "/ko/news/gallery", permanent: true },
      { source: "/48", destination: "/ko/education/academy", permanent: true },
      { source: "/49", destination: "/ko/prayer/dharani-1000-day", permanent: true },
    ];
  },
};

export default nextConfig;
