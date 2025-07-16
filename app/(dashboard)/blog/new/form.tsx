'use client';

import { useActionState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createPost } from '@/server/actions/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';

export default function NewPostForm() {
    const [state, formAction] = useActionState(createPost, {
        error: null,
        success: false,
    });
    const router = useRouter();
    const searchParams = useSearchParams();

    const errorParam = searchParams.get('error');

    useEffect(() => {
        if (state.success) {
            router.push('/blog');
        }
    }, [state.success, router]);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

            {errorParam && (
                <p className="text-red-500 mb-4">
                    Error: {errorParam}
                </p>
            )}

            {state.error && (
                <p className="text-red-500 mb-4">{state.error}</p>
            )}

            <form action={formAction} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                    <Input id="title" name="title" required />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium">Content</label>
                    <Textarea id="content" name="content" required rows={10} />
                </div>
                <Button type="submit">Create Post</Button>
            </form>
        </div>
    );
}
// 'use client';

// import { useActionState } from 'react';
// import { createPost } from '@/server/actions/blog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// export default function NewPostForm() {
//     const [state, formAction] = useActionState(createPost, {
//         error: null,
//         success: false
//     });

//     const router = useRouter();

//     useEffect(() => {
//         if (state.success) {
//             router.push('/blog');
//         }
//     }, [state.success, router]);

//     return (
//         <div className="container mx-auto py-10">
//             <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
//             {state.error && <p className="text-red-500 mb-4">{state.error}</p>}
//             <form action={formAction} className="space-y-4">
//                 <div>
//                     <label htmlFor="title" className="block text-sm font-medium">Title</label>
//                     <Input id="title" name="title" required />
//                 </div>
//                 <div>
//                     <label htmlFor="content" className="block text-sm font-medium">Content</label>
//                     <Textarea id="content" name="content" required rows={10} />
//                 </div>
//                 <Button type="submit">Create Post</Button>
//             </form>
//         </div>
//     );
// }
