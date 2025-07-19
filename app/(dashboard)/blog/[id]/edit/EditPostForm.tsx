'use client';

import { useActionState, useEffect, useState } from 'react';
import { updatePost } from '@/server/actions/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { useRouter } from 'next/navigation';

export default function EditPostForm({
    post,
}: {
    post: { id: number; title: string; content: string };
}) {
    const router = useRouter();

    const updatePostWithId = (
        prevState: { success: boolean; error: string | null },
        formData: FormData
    ) => updatePost(post.id, prevState, formData);

    const [state, formAction] = useActionState(updatePostWithId, {
        error: null,
        success: false,
    });

    const [editorContent, setEditorContent] = useState(post.content);

    // Redirect after successful update
    useEffect(() => {
        if (state.success) {
            router.push(`/blog/${post.id}`);
        }
    }, [state.success, post.id, router]);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
            {state.error && <p className="text-red-500 mb-4">{state.error}</p>}
            <form action={formAction} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                    <Input id="title" name="title" defaultValue={post.title} required />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium">Content</label>
                    <RichTextEditor
                        content={post.content}
                        onChange={(html) => setEditorContent(html)}
                    />
                    <input type="hidden" name="content" value={editorContent} />
                </div>
                <Button type="submit">Update Post</Button>
            </form>
        </div>
    );
}



// 'use client';

// import { useActionState } from 'react';
// import { updatePost } from '@/server/actions/blog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { useRouter } from 'next/navigation';

// export default function EditPostForm({ post }: { post: { id: number; title: string; content: string } }) {
//     const router = useRouter();

//     const updatePostWithId = (
//         prevState: { success: boolean; error: string | null },
//         formData: FormData
//     ) => updatePost(post.id, prevState, formData);

//     const [state, formAction] = useActionState(updatePostWithId, {
//         error: null,
//         success: false,
//     });

//     if (state.success) {
//         router.push(`/blog/${post.id}`);
//     }

//     return (
//         <div className="container mx-auto py-10">
//             <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
//             {state.error && <p className="text-red-500 mb-4">{state.error}</p>}
//             <form action={formAction} className="space-y-4">
//                 <div>
//                     <label htmlFor="title" className="block text-sm font-medium">Title</label>
//                     <Input id="title" name="title" defaultValue={post.title} required />
//                 </div>
//                 <div>
//                     <label htmlFor="content" className="block text-sm font-medium">Content</label>
//                     <Textarea id="content" name="content" defaultValue={post.content} required rows={10} />
//                 </div>
//                 <Button type="submit">Update Post</Button>
//             </form>
//         </div>
//     );
// }

// // 'use client';

// // import { useActionState } from 'react';
// // import { updatePost } from '@/server/actions/blog';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Textarea } from '@/components/ui/textarea';
// // import { useRouter } from 'next/navigation';

// // export default function EditPostForm({ post }: { post: { id: number; title: string; content: string } }) {
// //     const [state, formAction] = useActionState(updatePost.bind(null, post.id), {
// //         error: null,
// //         success: false,
// //     });
// //     const router = useRouter();

// //     if (state.success) {
// //         router.push(`/blog/${post.id}`);
// //     }

// //     return (
// //         <div className="container mx-auto py-10">
// //             <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
// //             {state.error && <p className="text-red-500 mb-4">{state.error}</p>}
// //             <form action={formAction} className="space-y-4">
// //                 <div>
// //                     <label htmlFor="title" className="block text-sm font-medium">Title</label>
// //                     <Input id="title" name="title" defaultValue={post.title} required />
// //                 </div>
// //                 <div>
// //                     <label htmlFor="content" className="block text-sm font-medium">Content</label>
// //                     <Textarea id="content" name="content" defaultValue={post.content} required rows={10} />
// //                 </div>
// //                 <Button type="submit">Update Post</Button>
// //             </form>
// //         </div>
// //     );
// // }
