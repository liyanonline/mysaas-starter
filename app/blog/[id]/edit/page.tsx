import { getPostById } from '@/app/actions/blog';
import EditPostForm from './EditPostForm'; // <-- make sure this exists

interface PageProps {
    params: {
        id: string;
    };
}

export default async function EditPostPage({ params }: PageProps) {
    const post = await getPostById(Number(params.id));

    if (!post) {
        return <div className="container mx-auto py-10">Post not found</div>;
    }

    return <EditPostForm post={post} />;
}

// // app/blog/[id]/edit/page.tsx
// import { getPostById } from '@/app/actions/blog';
// import EditPostForm from './EditPostForm';

// export default async function EditPostPage({ params }: { params: { id: string } }) {
//     const post = await getPostById(Number(params.id));

//     if (!post) {
//         return <div className="container mx-auto py-10">Post not found</div>;
//     }

//     return <EditPostForm post={post} />;
// }

// // 'use client';

// // import { useActionState } from 'react';
// // import { updatePost } from '@/app/actions/blog';
// // import { getPostById } from '@/app/actions/blog';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Textarea } from '@/components/ui/textarea';
// // import { useRouter } from 'next/navigation';

// // export default async function EditPostPage({ params }: { params: { id: string } }) {
// //     const post = await getPostById(parseInt(params.id));
// //     const [state, formAction] = useActionState(updatePost.bind(null, parseInt(params.id)), {
// //         error: null,
// //         success: false,
// //     });
// //     const router = useRouter();

// //     if (!post) {
// //         return <div className="container mx-auto py-10">Post not found</div>;
// //     }

// //     if (state.success) {
// //         router.push(`/blog/${params.id}`);
// //     }

// //     return (
// //         <div className="container mx-auto py-10">
// //             <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
// //             {state.error && <p className="text-red-500 mb-4">{state.error}</p>}
// //             <form action={formAction} className="space-y-4">
// //                 <div>
// //                     <label htmlFor="title" className="block text-sm font-medium">
// //                         Title
// //                     </label>
// //                     <Input id="title" name="title" defaultValue={post.title} required />
// //                 </div>
// //                 <div>
// //                     <label htmlFor="content" className="block text-sm font-medium">
// //                         Content
// //                     </label>
// //                     <Textarea id="content" name="content" defaultValue={post.content} required rows={10} />
// //                 </div>
// //                 <Button type="submit">Update Post</Button>
// //             </form>
// //         </div>
// //     );
// // }