import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { connectToDB } from '@/utils/database'
import Category from '@/models/category'

export const GET = async (req, { params }) => {
  try {
    await connectToDB()

    const category = await Category.findOne({ _id: params.id })

    return new Response(JSON.stringify(category), { status: 200 })
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

    const { title } = await req.json()
    await connectToDB()

    const category = await Category.findOne({ _id: params.id })

    if (!category) {
      return new Response(
        JSON.stringify({ message: 'There is no category with this id' }),
        { status: 400 }
      )
    }
    if (session.user.id != category.author) {
      return new Response(
        JSON.stringify({
          message: 'You are not allowed to update this category',
        }),
        { status: 400 }
      )
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { _id: params.id },
      { title },
      { new: true }
    )

    return new Response(JSON.stringify(updatedCategory), { status: 200 })
  } catch (error) {
    console.log(error)
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

    const category = await Category.findOne({ _id: params.id })

    if (!category) {
      return new Response(
        JSON.stringify({ message: 'There is no category with this id' }),
        { status: 400 }
      )
    }
    if (session.user.id != category.author) {
      return new Response(
        JSON.stringify({
          message: 'You are not allowed to delete this category',
        }),
        { status: 400 }
      )
    }

    await Category.deleteOne({ _id: params.id })

    return new Response('Successfully deleted', { status: 200 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}
