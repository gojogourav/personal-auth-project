import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const prisma = new PrismaClient()


const registerSchema = z.object({
  username: z.string().min(2).max(20),
  password: z.string().min(2),
  email: z.string().email(),
})


export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = registerSchema.safeParse(body)

    if (!result.success) {
      console.log(result);
      
      return NextResponse.json(
        { error: result.error.flatten() },
        { status: 400 }
      )
    }


    
    const { username, password, email,profilePhoto } = body
    
    // Check if username exists
    const [existingUsername, existingEmail] = await prisma.$transaction([
      prisma.user.findUnique({ where: { username } }),
      prisma.user.findUnique({ where: { email } })
    ])

    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      )
    }

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      )
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user

 
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword.toString(),
        email,
      }
    })

    return NextResponse.json({ 
      success: true,
      userId: user.id
    })

  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}