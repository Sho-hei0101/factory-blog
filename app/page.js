import Link from 'next/link';
import { formatDate, getAllPosts } from '../lib/posts';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <section className="post-list">
      {posts.map((post) => (
        <article key={post.slug} className="post-card">
          <h2>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </h2>
          <div className="post-meta">
            <span>{formatDate(post.date)}</span>
            <div className="post-meta">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          <p>{post.description}</p>
        </article>
      ))}
    </section>
  );
}
