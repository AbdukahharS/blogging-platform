import { connectToDB } from '@/utils/database'
import Category from '@/models/category'
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'

export const GET = async () => {
  try {
    await connectToDB()

    const categories = await Category.find({})

    return new Response(JSON.stringify(categories), { status: 200 })
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
  const { title, author } = await req.json()

  try {
    await connectToDB()

    const newCategory = new Category({ author, title })

    await newCategory.save()

    return new Response(JSON.stringify(newCategory), { status: 201 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}
