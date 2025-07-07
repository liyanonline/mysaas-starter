import { deletePost } from '@/app/actions/blog';
import { NextResponse } from 'next/server';

export async function POST(
    request: Request,
    context: { params: { id: string } }) {
    const result = await deletePost(parseInt(context.params.id));
    if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ success: true });
}