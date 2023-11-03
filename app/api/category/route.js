import { connectToDB } from '@/utils/database'
import Category from '@/models/category'

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
