import Link from 'next/link';
import { getAllTags } from '../../lib/posts';

export const metadata = {
  title: 'Tags | factory-blog',
  description: 'Browse posts by tag.'
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <section>
      <h2>Tags</h2>
      <div className="post-meta">
        {tags.map((item) => (
          <Link key={item.tag} href={`/tags/${encodeURIComponent(item.tag)}`} className="tag">
            {item.tag} ({item.count})
          </Link>
        ))}
      </div>
    </section>
  );
}
