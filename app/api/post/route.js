import { connectToDB } from '@/utils/database'
import Post from '@/models/post'

export const GET = async () => {
  try {
    await connectToDB()

    const posts = await Post.find({})

    return new Response(JSON.stringify(posts), { status: 200 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}

export const POST = async (req) => {
  const { title, author, body, categories, status, seo, slug, scheduledDate } =
    await req.json()

  try {
    await connectToDB()

    const newPost = new Post({ author, title, body, categories, status, seo })

    if (slug) {
      newPost.slug = slug
    }
    if (scheduledDate) {
      newPost.scheduledDate = scheduledDate
    }
    await newPost.save()

    return new Response(JSON.stringify(newPost), { status: 201 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}
