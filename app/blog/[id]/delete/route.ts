import { deletePost } from '@/app/actions/blog';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').at(-2); // '/blog/5/delete' → '5'

    if (!id) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const result = await deletePost(Number(id));
    if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
}


// export const runtime = 'nodejs';


// import { deletePost } from '@/app/actions/blog';
// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(
//     req: NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     const id = Number(params.id);
//     const result = await deletePost(id);

//     if (result.error) {
//         return NextResponse.json({ error: result.error }, { status: 400 });
//     }

//     return NextResponse.json({ success: true });
// }

// // import { deletePost } from '@/app/actions/blog';
// // import { NextRequest, NextResponse } from 'next/server';

// // export async function POST(
// //     req: NextRequest,
// //     context: { params: { id: string } }
// // ) {
// //     const id = context.params.id;

// //     const result = await deletePost(Number(id));

// //     if (result?.error) {
// //         return NextResponse.json({ error: result.error }, { status: 400 });
// //     }

// //     return NextResponse.json({ success: true });
// // }


// // // import { deletePost } from '@/app/actions/blog';
// // // import { NextRequest, NextResponse } from 'next/server';

// // // export async function POST(
// // //     request: NextRequest,
// // //     context: { params: { id: string } }
// // // ) {
// // //     const { id } = context.params;
// // //     const result = await deletePost(parseInt(id));

// // //     if (result.error) {
// // //         return NextResponse.json({ error: result.error }, { status: 400 });
// // //     }

// // //     return NextResponse.json({ success: true });
// // // }



// // // // import { deletePost } from '@/app/actions/blog';
// // // // import { NextRequest, NextResponse } from 'next/server';

// // // // // Standard type for dynamic route params
// // // // export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
// // // //     const id = params.id;
// // // //     const result = await deletePost(parseInt(id));

// // // //     if (result.error) {
// // // //         return NextResponse.json({ error: result.error }, { status: 400 });
// // // //     }

// // // //     return NextResponse.json({ success: true });
// // // // }

// // // // // Use Node.js runtime to avoid bcryptjs issues
// // // // export const runtime = 'nodejs';

// // // // // import { deletePost } from '@/app/actions/blog';
// // // // // import { NextRequest, NextResponse } from 'next/server';

// // // // // // Use a generic Record type for params
// // // // // export async function POST(req: NextRequest, { params }: { params: Record<string, string> }) {
// // // // //     const id = params.id;
// // // // //     const result = await deletePost(parseInt(id));

// // // // //     if (result.error) {
// // // // //         return NextResponse.json({ error: result.error }, { status: 400 });
// // // // //     }

// // // // //     return NextResponse.json({ success: true });
// // // // // }

// // // // // export const runtime = 'nodejs';

// // // // // // import { deletePost } from '@/app/actions/blog';
// // // // // // import { NextRequest, NextResponse } from 'next/server';

// // // // // // // Use a simple inline type for params
// // // // // // export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
// // // // // //     const id = params.id;
// // // // // //     const result = await deletePost(parseInt(id));

// // // // // //     if (result.error) {
// // // // // //         return NextResponse.json({ error: result.error }, { status: 400 });
// // // // // //     }

// // // // // //     return NextResponse.json({ success: true });
// // // // // // }

// // // // // // // Explicitly set Node.js runtime to avoid bcryptjs issues
// // // // // // export const runtime = 'nodejs';

// // // // // // // import { deletePost } from '@/app/actions/blog';
// // // // // // // import { NextRequest, NextResponse } from 'next/server';
// // // // // // // import type { Params } from 'next/dist/server/router';

// // // // // // // // Explicitly use Next.js's Params type
// // // // // // // export async function POST(req: NextRequest, { params }: { params: Params }) {
// // // // // // //     const id = params.id as string; // Type assertion to ensure id is string
// // // // // // //     const result = await deletePost(parseInt(id));

// // // // // // //     if (result.error) {
// // // // // // //         return NextResponse.json({ error: result.error }, { status: 400 });
// // // // // // //     }

// // // // // // //     return NextResponse.json({ success: true });
// // // // // // // }

// // // // // // // // Ensure Node.js runtime to avoid bcryptjs issues
// // // // // // // export const runtime = 'nodejs';

// // // // // // // // import { deletePost } from '@/app/actions/blog';
// // // // // // // // import { NextRequest, NextResponse } from 'next/server';

// // // // // // // // export async function POST(
// // // // // // // //     req: NextRequest,
// // // // // // // //     context: { params: { id: string } } // 👈 MUST be named `context`
// // // // // // // // ) {
// // // // // // // //     const { id } = context.params;
// // // // // // // //     const result = await deletePost(parseInt(id));

// // // // // // // //     if (result.error) {
// // // // // // // //         return NextResponse.json({ error: result.error }, { status: 400 });
// // // // // // // //     }

// // // // // // // //     return NextResponse.json({ success: true });
// // // // // // // // }
// // // // // // // // // import { deletePost } from '@/app/actions/blog';
// // // // // // // // // import { NextRequest, NextResponse } from 'next/server';

// // // // // // // // // export async function POST(
// // // // // // // // //     req: NextRequest,
// // // // // // // // //     context: { params: { id: string } }
// // // // // // // // // ) {
// // // // // // // // //     const id = context.params.id;
// // // // // // // // //     const result = await deletePost(parseInt(id));

// // // // // // // // //     if (result.error) {
// // // // // // // // //         return NextResponse.json({ error: result.error }, { status: 400 });
// // // // // // // // //     }

// // // // // // // // //     return NextResponse.json({ success: true });
// // // // // // // // // }
// // // // // // // // // // import { deletePost } from '@/app/actions/blog';
// // // // // // // // // // import { NextRequest, NextResponse } from 'next/server';

// // // // // // // // // // export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
// // // // // // // // // //     const id = params.id;
// // // // // // // // // //     const result = await deletePost(parseInt(id));

// // // // // // // // // //     if (result.error) {
// // // // // // // // // //         return NextResponse.json({ error: result.error }, { status: 400 });
// // // // // // // // // //     }

// // // // // // // // // //     return NextResponse.json({ success: true });
// // // // // // // // // // }


// // // // // // // // // // // import { deletePost } from '@/app/actions/blog';
// // // // // // // // // // // import { NextRequest, NextResponse } from 'next/server';

// // // // // // // // // // // // Use Next.js's built-in type for dynamic route parameters
// // // // // // // // // // // export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
// // // // // // // // // // //     const id = params.id;
// // // // // // // // // // //     const result = await deletePost(parseInt(id));

// // // // // // // // // // //     if (result.error) {
// // // // // // // // // // //         return NextResponse.json({ error: result.error }, { status: 400 });
// // // // // // // // // // //     }

// // // // // // // // // // //     return NextResponse.json({ success: true });
// // // // // // // // // // // }

// // // // // // // // // // // // import { deletePost } from '@/app/actions/blog';
// // // // // // // // // // // // import { NextRequest, NextResponse } from 'next/server';

// // // // // // // // // // // // // Define the expected type for the context parameter
// // // // // // // // // // // // interface Context {
// // // // // // // // // // // //     params: { id: string };
// // // // // // // // // // // // }

// // // // // // // // // // // // export async function POST(req: NextRequest, { params }: Context) {
// // // // // // // // // // // //     const id = params.id;
// // // // // // // // // // // //     const result = await deletePost(parseInt(id));

// // // // // // // // // // // //     if (result.error) {
// // // // // // // // // // // //         return NextResponse.json({ error: result.error }, { status: 400 });
// // // // // // // // // // // //     }

// // // // // // // // // // // //     return NextResponse.json({ success: true });
// // // // // // // // // // // // }

// // // // // // // // // // // // // import { deletePost } from '@/app/actions/blog';
// // // // // // // // // // // // // import { NextRequest, NextResponse } from 'next/server';

// // // // // // // // // // // // // export async function POST(
// // // // // // // // // // // // //     req: NextRequest,
// // // // // // // // // // // // //     context: { params: { id: string } }
// // // // // // // // // // // // // ) {
// // // // // // // // // // // // //     const id = context.params.id;
// // // // // // // // // // // // //     const result = await deletePost(parseInt(id));

// // // // // // // // // // // // //     if (result.error) {
// // // // // // // // // // // // //         return NextResponse.json({ error: result.error }, { status: 400 });
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     return NextResponse.json({ success: true });
// // // // // // // // // // // // // }


// // // // // // // // // // // // // // import { deletePost } from '@/app/actions/blog';
// // // // // // // // // // // // // // import { NextResponse } from 'next/server';

// // // // // // // // // // // // // // export async function POST(
// // // // // // // // // // // // // //     request: Request,
// // // // // // // // // // // // // //     context: { params: { id: string } }) {
// // // // // // // // // // // // // //     const result = await deletePost(parseInt(context.params.id));
// // // // // // // // // // // // // //     if (result.error) {
// // // // // // // // // // // // // //         return NextResponse.json({ error: result.error }, { status: 400 });
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //     return NextResponse.json({ success: true });
// // // // // // // // // // // // // // }