import { connectToDB } from '@/utils/database'
import Post from '@/models/post'

export const GET = async (req, { params }) => {
  try {
    await connectToDB()

    const post = await Post.findOne({ _id: params.id })

    return new Response(JSON.stringify(post), { status: 200 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}

export const PUT = async (req, { params }) => {
  const data = await req.json()

  try {
    await connectToDB()

    const updatedPost = await Post.findOneAndUpdate({ _id: params.id }, data, {
      new: true,
    })

    return new Response(JSON.stringify(updatedPost), { status: 200 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()

    await Post.deleteOne({ _id: params.id })

    return new Response('Successfully deleted', { status: 200 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}
