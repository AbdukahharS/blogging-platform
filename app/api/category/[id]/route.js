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
  const { title } = await req.json()

  try {
    await connectToDB()

    const updatedCategory = await Category.findOneAndUpdate(
      { _id: params.id },
      { title },
      { new: true }
    )

    return new Response(JSON.stringify(updatedCategory), { status: 200 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()

    await Category.deleteOne({ _id: params.id })

    return new Response('Successfully deleted', { status: 200 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}
