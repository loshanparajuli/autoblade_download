import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell not-found-page">
      <div className="canvas not-found-canvas">
        <div className="not-found-content">
          <p className="not-found-eyebrow">Error 404</p>
          <h1 className="not-found-title">
            page not <em>found</em>
          </h1>
          <p className="not-found-copy">
            The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
          </p>
          <Link href="/" className="dark-cta not-found-cta">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
