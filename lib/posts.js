import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

const requiredFields = [
  'title',
  'description',
  'date',
  'tags',
  'cta_primary_label',
  'cta_primary_url'
];

function validateFrontmatter(frontmatter, slug) {
  for (const field of requiredFields) {
    if (frontmatter[field] === undefined) {
      throw new Error(`Missing required frontmatter field "${field}" in ${slug}`);
    }
  }
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim()).filter(Boolean);
  }
  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      validateFrontmatter(data, slug);

      return {
        slug,
        ...data,
        tags: normalizeTags(data.tags)
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  validateFrontmatter(data, slug);

  return {
    slug,
    ...data,
    tags: normalizeTags(data.tags),
    content
  };
}

export async function getPostHtml(slug) {
  const post = getPostBySlug(slug);
  if (!post) {
    return null;
  }
  const processed = await remark().use(html).process(post.content);
  return {
    ...post,
    contentHtml: processed.toString()
  };
}

export function getAllTags() {
  const posts = getAllPosts();
  const tagMap = new Map();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag) {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}
