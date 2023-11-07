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
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response(
        JSON.stringify({ message: 'You are not logged in.' }),
        { status: 400 }
      )
    }

    const data = await req.json()
    await connectToDB()

    const updatedPost = await Post.findOneAndUpdate({ _id: params.id }, data, {
      new: true,
    })

    if (!updatedPost) {
      return new Response(
        { message: 'There is no post with this id' },
        { status: 400 }
      )
    }

    return new Response(JSON.stringify(updatedPost), { status: 200 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}

export const DELETE = async (req, { params }) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response(
        JSON.stringify({ message: 'You are not logged in.' }),
        { status: 400 }
      )
    }

    await connectToDB()

    await Post.deleteOne({ _id: params.id })

    return new Response('Successfully deleted', { status: 200 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}
