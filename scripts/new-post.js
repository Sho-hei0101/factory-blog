const fs = require('fs');
const path = require('path');

const title = process.argv.slice(2).join(' ').trim();

if (!title) {
  console.error('Please provide a post title. Example: npm run new:post "My New Post"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)+/g, '');

const date = new Date().toISOString().split('T')[0];

const template = `---
title: "${title}"
description: "Add a short description for ${title}."
date: "${date}"
tags:
  - news
  - updates
cta_primary_label: "Learn more"
cta_primary_url: "https://example.com"
---

Start writing your post here.
`;

const postsDir = path.join(process.cwd(), 'content/posts');
const filePath = path.join(postsDir, `${slug}.md`);

if (fs.existsSync(filePath)) {
  console.error(`A post with the slug "${slug}" already exists.`);
  process.exit(1);
}

fs.mkdirSync(postsDir, { recursive: true });
fs.writeFileSync(filePath, template, 'utf8');

console.log(`Created ${filePath}`);
