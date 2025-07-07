// import { getPostById } from '@/app/actions/blog';
// import EditPostForm from './EditPostForm';
// import { notFound } from 'next/navigation';

// export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
//     const { id } = await params; // Resolve the Promise
//     const post = await getPostById(Number(id));

//     if (!post) {
//         notFound();
//     }

//     return <EditPostForm post={post} />;
// }
import { getPostById } from '@/app/actions/blog';
import EditPostForm from './EditPostForm';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; // Resolve the Promise
    const post = await getPostById(Number(id));

    if (!post) {
        return <div className="container mx-auto py-10">Post not found</div>;
    }

    return <EditPostForm post={post} />;
}

// // app/blog/[id]/edit/page.tsx
// import { getPostById } from '@/app/actions/blog';
// import EditPostForm from './EditPostForm';
// import { notFound } from 'next/navigation';

// export default async function EditPostPage({ params }: { params: { id: string } }) {
//     const post = await getPostById(Number(params.id));

//     if (!post) {
//         notFound();
//     }

//     return <EditPostForm post={post} />;
// }
