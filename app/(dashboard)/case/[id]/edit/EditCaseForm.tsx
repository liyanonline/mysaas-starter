'use client';

import { useActionState, useEffect, useState } from 'react';
import { updateCase } from '@/server/actions/case';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { useRouter } from 'next/navigation';

export default function EditCaseForm({
    caseItem,
}: {
    caseItem: { id: number; title: string; description: string | null };
}) {
    const router = useRouter();
    const [editorContent, setEditorContent] = useState(caseItem.description || '');

    const updateCaseWithId = (
        prevState: { success: boolean; error: string | null },
        formData: FormData
    ) => updateCase(caseItem.id, prevState, formData);

    const [state, formAction] = useActionState(updateCaseWithId, {
        error: null,
        success: false,
    });

    useEffect(() => {
        if (state.success) {
            router.push(`/case/${caseItem.id}`);
        }
    }, [state.success, caseItem.id, router]);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Edit Case</h1>
            {state.error && <p className="text-red-500 mb-4">{state.error}</p>}
            <form action={formAction} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                    <Input id="title" name="title" defaultValue={caseItem.title} required />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium">Description</label>
                    <RichTextEditor
                        content={caseItem.description || ''}
                        onChange={(html) => setEditorContent(html)}
                    />
                    <input type="hidden" name="description" value={editorContent} />
                </div>
                <Button type="submit">Update Case</Button>
            </form>
        </div>
    );
}
// 'use client';

// import { useActionState } from 'react';
// import { updateCase } from '@/server/actions/case';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// export default function EditCaseForm({
//     caseItem, // Renamed from post to caseItem
// }: {
//     caseItem: { id: number; title: string; description: string }; // Updated prop type
// }) {
//     const router = useRouter();

//     const updateCaseWithId = (
//         prevState: { success: boolean; error: string | null },
//         formData: FormData
//     ) => updateCase(caseItem.id, prevState, formData); // Updated function name

//     const [state, formAction] = useActionState(updateCaseWithId, {
//         error: null,
//         success: false,
//     });

//     // ✅ Redirect safely after successful update
//     useEffect(() => {
//         if (state.success) {
//             router.push(`/case/${caseItem.id}`); // Updated to case route
//         }
//     }, [state.success, caseItem.id, router]);

//     return (
//         <div className="container mx-auto py-10">
//             <h1 className="text-3xl font-bold mb-6">Edit Case</h1> {/* Updated title */}
//             {state.error && <p className="text-red-500 mb-4">{state.error}</p>}
//             <form action={formAction} className="space-y-4">
//                 <div>
//                     <label htmlFor="title" className="block text-sm font-medium">Title</label>
//                     <Input id="title" name="title" defaultValue={caseItem.title} required />
//                 </div>
//                 <div>
//                     <label htmlFor="description" className="block text-sm font-medium">Description</label> {/* Updated from content */}
//                     <Textarea id="description" name="description" defaultValue={caseItem.description} required rows={10} /> {/* Updated from content */}
//                 </div>
//                 <Button type="submit">Update Case</Button> {/* Updated button text */}
//             </form>
//         </div>
//     );
// }

// // 'use client';

// // import { useActionState } from 'react';
// // import { updateCase } from '@/server/actions/case';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Textarea } from '@/components/ui/textarea';
// // import { useRouter } from 'next/navigation';
// // import { useEffect } from 'react';

// // export default function EditPostForm({
// //     post,
// // }: {
// //     post: { id: number; title: string; content: string };
// // }) {
// //     const router = useRouter();

// //     const updatePostWithId = (
// //         prevState: { success: boolean; error: string | null },
// //         formData: FormData
// //     ) => updateCase(post.id, prevState, formData);

// //     const [state, formAction] = useActionState(updatePostWithId, {
// //         error: null,
// //         success: false,
// //     });

// //     // ✅ redirect safely after successful update
// //     useEffect(() => {
// //         if (state.success) {
// //             router.push(`/case/${post.id}`);
// //         }
// //     }, [state.success, post.id, router]);

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


// // // 'use client';

// // // import { useActionState } from 'react';
// // // import { updatePost } from '@/server/actions/case';
// // // import { Button } from '@/components/ui/button';
// // // import { Input } from '@/components/ui/input';
// // // import { Textarea } from '@/components/ui/textarea';
// // // import { useRouter } from 'next/navigation';

// // // export default function EditPostForm({ post }: { post: { id: number; title: string; content: string } }) {
// // //     const router = useRouter();

// // //     const updatePostWithId = (
// // //         prevState: { success: boolean; error: string | null },
// // //         formData: FormData
// // //     ) => updatePost(post.id, prevState, formData);

// // //     const [state, formAction] = useActionState(updatePostWithId, {
// // //         error: null,
// // //         success: false,
// // //     });

// // //     if (state.success) {
// // //         router.push(`/case/${post.id}`);
// // //     }

// // //     return (
// // //         <div className="container mx-auto py-10">
// // //             <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
// // //             {state.error && <p className="text-red-500 mb-4">{state.error}</p>}
// // //             <form action={formAction} className="space-y-4">
// // //                 <div>
// // //                     <label htmlFor="title" className="block text-sm font-medium">Title</label>
// // //                     <Input id="title" name="title" defaultValue={post.title} required />
// // //                 </div>
// // //                 <div>
// // //                     <label htmlFor="content" className="block text-sm font-medium">Content</label>
// // //                     <Textarea id="content" name="content" defaultValue={post.content} required rows={10} />
// // //                 </div>
// // //                 <Button type="submit">Update Post</Button>
// // //             </form>
// // //         </div>
// // //     );
// // // }

// // // // 'use client';

// // // // import { useActionState } from 'react';
// // // // import { updatePost } from '@/server/actions/case';
// // // // import { Button } from '@/components/ui/button';
// // // // import { Input } from '@/components/ui/input';
// // // // import { Textarea } from '@/components/ui/textarea';
// // // // import { useRouter } from 'next/navigation';

// // // // export default function EditPostForm({ post }: { post: { id: number; title: string; content: string } }) {
// // // //     const [state, formAction] = useActionState(updatePost.bind(null, post.id), {
// // // //         error: null,
// // // //         success: false,
// // // //     });
// // // //     const router = useRouter();

// // // //     if (state.success) {
// // // //         router.push(`/case/${post.id}`);
// // // //     }

// // // //     return (
// // // //         <div className="container mx-auto py-10">
// // // //             <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
// // // //             {state.error && <p className="text-red-500 mb-4">{state.error}</p>}
// // // //             <form action={formAction} className="space-y-4">
// // // //                 <div>
// // // //                     <label htmlFor="title" className="block text-sm font-medium">Title</label>
// // // //                     <Input id="title" name="title" defaultValue={post.title} required />
// // // //                 </div>
// // // //                 <div>
// // // //                     <label htmlFor="content" className="block text-sm font-medium">Content</label>
// // // //                     <Textarea id="content" name="content" defaultValue={post.content} required rows={10} />
// // // //                 </div>
// // // //                 <Button type="submit">Update Post</Button>
// // // //             </form>
// // // //         </div>
// // // //     );
// // // // }
