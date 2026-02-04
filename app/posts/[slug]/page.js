import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  formatDate,
  getAllPosts,
  getPostHtml,
  getSiteUrl
} from '../../../lib/posts';

export async function generateMetadata({ params }) {
  const post = await getPostHtml(params.slug);
  if (!post) {
    return {};
  }

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/posts/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url
    }
  };
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }) {
  const post = await getPostHtml(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <Link href="/">← Back to all posts</Link>
      <h2>{post.title}</h2>
      <div className="post-meta">
        <span>{formatDate(post.date)}</span>
        {post.tags.map((tag) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag">
            {tag}
          </Link>
        ))}
      </div>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      <a className="cta" href={post.cta_primary_url}>
        {post.cta_primary_label}
      </a>
    </article>
  );
}
