import { deleteCase } from '@/server/actions/case';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').at(-2); // '/case/5/delete' → '5'

    if (!id) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const result = await deleteCase(Number(id));
    if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
    }
    // Get the referer URL (previous page) or fallback to a default page
    // const referer = request.headers.get('referer') || '/case';
    const referer = '/case';
    // return NextResponse.json({ success: true });
    return NextResponse.redirect(new URL(referer, request.url));
}

