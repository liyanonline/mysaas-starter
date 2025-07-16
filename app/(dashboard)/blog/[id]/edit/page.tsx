import { getPostById } from '@/server/actions/blog';
import EditPostForm from './EditPostForm';
import { notFound } from 'next/navigation';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getPostById(Number(id));

    if (!post) {
        notFound();
    }

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-6 bg-gradient-to-r from-indigo-100 to-white border-b">
                    <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
                </div>
                <div className="px-6 py-6">
                    <EditPostForm post={post} />
                </div>
            </div>
        </div>
    );
}

// import { getPostById } from '@/server/actions/blog';
// import EditPostForm from './EditPostForm';

// export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
//     const { id } = await params; // Resolve the Promise
//     const post = await getPostById(Number(id));

//     if (!post) {
//         return <div className="container mx-auto py-10">Post not found</div>;
//     }

//     return <EditPostForm post={post} />;
// }

// // // app/blog/[id]/edit/page.tsx
// // import { getPostById } from '@/server/actions/blog';
// // import EditPostForm from './EditPostForm';
// // import { notFound } from 'next/navigation';

// // export default async function EditPostPage({ params }: { params: { id: string } }) {
// //     const post = await getPostById(Number(params.id));

// //     if (!post) {
// //         notFound();
// //     }

// //     return <EditPostForm post={post} />;
// // }
