'use client';

import { useActionState } from 'react';
import { createPost } from '@/actions/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
    const [state, formAction] = useActionState(createPost, { error: null, success: false });
    const router = useRouter();

    if (state.success) {
        router.push('/blog');
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
            {state.error && <p className="text-red-500 mb-4">{state.error}</p>}
            <form action={formAction} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">
                        Title
                    </label>
                    <Input id="title" name="title" required />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium">
                        Content
                    </label>
                    <Textarea id="content" name="content" required rows={10} />
                </div>
                <Button type="submit">Create Post</Button>
            </form>
        </div>
    );
}