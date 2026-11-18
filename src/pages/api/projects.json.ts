import type { APIRoute } from 'astro';
import { getCollection, z } from 'astro:content';

const repoSchema = z.object({
  stargazers_count: z.number().int().nonnegative(),
  language: z.string().nullable(),
  topics: z.array(z.string()),
});

export const GET: APIRoute = async () => {
  const [zh, en] = await Promise.all([getCollection('zh'), getCollection('en')]);
  const repos = new Set([...zh, ...en]
    .filter(({ data }) => data.kind === 'projects' && !data.draft)
    .flatMap(({ data }) => (data.projects ?? []).map(({ repo }) => repo)));

  const results = await Promise.allSettled([...repos].map(async (repo) => {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) throw new Error(`${repo}: HTTP ${response.status}`);
    const data = repoSchema.parse(await response.json());
    return [repo, { stars: data.stargazers_count, language: data.language, topics: data.topics.slice(0, 4) }] as const;
  }));

  const entries = results.flatMap((result) => result.status === 'fulfilled' ? [result.value] : []);
  const complete = entries.length === repos.size;
  const unavailable = !complete && entries.length === 0;
  return Response.json(Object.fromEntries(entries), {
    status: unavailable ? 503 : 200,
    headers: {
      'Cache-Control': unavailable ? 'no-store' : 'public, max-age=60',
      'Vercel-CDN-Cache-Control': complete
        ? 'public, s-maxage=43200, stale-while-revalidate=86400, stale-if-error=604800'
        : unavailable ? 'no-store' : 'public, s-maxage=60',
    },
  });
};
