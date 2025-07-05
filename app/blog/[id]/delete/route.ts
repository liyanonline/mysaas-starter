import { deletePost } from '@/actions/blog';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const result = await deletePost(parseInt(params.id));
    if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ success: true });
}