import { connectToDB } from '@/utils/database'
import Comment from '@/models/comment'
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'

export const GET = async () => {
  try {
    await connectToDB()

    const comments = await Comment.find({})

    return new Response(JSON.stringify(comments), { status: 200 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}

export const POST = async (req) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response(JSON.stringify({ message: 'You are not logged in.' }), {
      status: 400,
    })
  }
  const { body, author, target } = await req.json()

  try {
    await connectToDB()

    const newComment = new Comment({ author, body, target })

    await newComment.save()

    return new Response(JSON.stringify(newComment), { status: 201 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}
