// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'
// import bcrypt from 'bcryptjs'


// const prisma = new PrismaClient()

// export async function POST(req: Request) {
//   try {
//     const { identifier,email, password } = await req.json()

//     const user = await prisma.user.findFirst({
//       where: {OR:[{username:identifier},{email:identifier}]}
//     })

//     if (!user) {
//       return NextResponse.json(
//         { error: "Invalid credentials" },
//         { status: 400 }
//       )
//     }
//     const isVerified = await bcrypt.compare(password,user.password)
//     if(!isVerified){
//         return NextResponse.json(
//             { error: "Invalid credentials" },
//             { status: 400 }
//           )
//     }
//     return NextResponse.json({ 
//       success: true,
//       userId: user.id
//     })

//   } catch (error) {
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     )
//   }
// }