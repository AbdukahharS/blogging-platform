import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { connectToDB } from '@/utils/database'
import Comment from '@/models/comment'

export const GET = async (req, { params }) => {
  try {
    await connectToDB()

    const comments = await Comment.find({ target: params.id })

    return new Response(JSON.stringify(comments), { status: 200 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}

export const DELETE = async (req, { params }) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response(JSON.stringify({ message: 'You are not logged in.' }), {
      status: 400,
    })
  }

  try {
    await connectToDB()

    const comment = await Comment.findOne({ _id: params.id })

    if (!comment) {
      return new Response(
        JSON.stringify({ message: 'There is no comment with this id' }),
        { status: 400 }
      )
    }
    if (session.user.id != comment.author) {
      return new Response(
        JSON.stringify({
          message: 'You are not allowed to delete this comment',
        }),
        { status: 400 }
      )
    }

    await Comment.deleteOne({ _id: params.id })

    return new Response('Successfully deleted', { status: 200 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}
