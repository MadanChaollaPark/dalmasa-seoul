import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <h1>Page not found</h1>
      <p>The requested Dalmasa page could not be found.</p>
      <Link href="/ko">한국어 홈</Link>
      <Link href="/en">English home</Link>
    </main>
  );
}
