import { deletePost } from '@/server/actions/blog';
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
    // Get the referer URL (previous page) or fallback to a default page
    // const referer = request.headers.get('referer') || '/blog';
    const referer = '/blog';
    // return NextResponse.json({ success: true });
    return NextResponse.redirect(new URL(referer, request.url));
}

