import type { MetadataRoute } from "next"

const base = "https://almeiyar.me"

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${base}/`, changeFrequency: "weekly", priority: 1.0 },
  { url: `${base}/about`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${base}/portfolio`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${base}/blog`, changeFrequency: "daily", priority: 0.8 },
  { url: `${base}/events`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.6 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const routes = staticRoutes.map((route) => ({ ...route, lastModified: now }))

  try {
    const [{ default: connectDB }, { default: BlogPost }, { default: EventItem }] = await Promise.all([
      import("@/lib/mongodb"),
      import("@/models/BlogPost"),
      import("@/models/EventItem"),
    ])

    await connectDB()
    const [posts, events] = await Promise.all([
      BlogPost.find({ published: true }).select("slug updatedAt createdAt").lean(),
      EventItem.find({ published: true }).select("_id updatedAt createdAt").lean(),
    ])

    for (const post of posts as Array<{ slug?: string; updatedAt?: Date; createdAt?: Date }>) {
      if (!post.slug) continue
      routes.push({
        url: `${base}/blog/${post.slug}`,
        lastModified: post.updatedAt || post.createdAt || now,
        changeFrequency: "weekly",
        priority: 0.7,
      })
    }

    for (const event of events as Array<{ _id?: unknown; updatedAt?: Date; createdAt?: Date }>) {
      if (!event._id) continue
      routes.push({
        url: `${base}/events/${String(event._id)}`,
        lastModified: event.updatedAt || event.createdAt || now,
        changeFrequency: "weekly",
        priority: 0.7,
      })
    }
  } catch (error) {
    console.warn("Sitemap dynamic routes skipped.", error)
  }

  return routes
}
