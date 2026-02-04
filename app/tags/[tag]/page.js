import Link from 'next/link';
import { formatDate, getAllTags, getPostsByTag } from '../../../lib/posts';

export function generateStaticParams() {
  return getAllTags().map((item) => ({ tag: item.tag }));
}

export function generateMetadata({ params }) {
  return {
    title: `Tag: ${params.tag} | factory-blog`,
    description: `Posts tagged with ${params.tag}.`
  };
}

export default function TagPage({ params }) {
  const posts = getPostsByTag(params.tag);

  return (
    <section>
      <Link href="/tags">← All tags</Link>
      <h2>Tag: {params.tag}</h2>
      <div className="post-list">
        {posts.map((post) => (
          <article key={post.slug} className="post-card">
            <h3>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h3>
            <div className="post-meta">
              <span>{formatDate(post.date)}</span>
            </div>
            <p>{post.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
