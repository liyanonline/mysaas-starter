export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { getPostById } from '@/server/actions/blog';
import { getUser } from '@/lib/db/queries';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; // Resolve the Promise
    const user = await getUser();
    const post = await getPostById(parseInt(id));

    if (!post) {
        return <div className="container mx-auto py-10">Post not found</div>;
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-4">By {post.authorEmail}</p>
            {/* <p className="mb-6">{post.content}</p> */}
            <div
                className="prose max-w-none"
                // dangerouslySetInnerHTML={{ __html: caseItem.description }}
                dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
            ></div>
            {user?.id === post.authorId && (
                <div className="space-x-4">
                    <Link href={`/blog/${post.id}/edit`}>
                        <Button>Edit Post</Button>
                    </Link>
                    <form action={`/blog/${post.id}/delete`} method="POST">
                        <Button variant="destructive" type="submit">
                            Delete Post
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
}
// /* Grok:
// Changes:Typed params as Promise<{ id: string }>: Matches the canary version’s requirement that params is a Promise.
// Await params: Resolves the Promise to access id.
// Kept runtime = 'nodejs': Ensures compatibility with bcryptjs or other Node.js APIs used in getUser or getPostById.
// No Other Changes: The rest of the code (including dynamic = 'force-dynamic') remains intact.

// Why this should work:
// The error explicitly states that params must be awaited, as it’s a Promise in Next.js 15.4.0-canary.9. Awaiting params satisfies the type checker and runtime requirements.
// The dynamic = 'force-dynamic' ensures the page is dynamically rendered, which aligns with the async nature of params.
// */

// // export const dynamic = 'force-dynamic';
// // export const runtime = 'nodejs';

// // import { getPostById } from '@/server/actions/blog';
// // import { getUser } from '@/lib/db/queries';
// // import { Button } from '@/components/ui/button';
// // import Link from 'next/link';

// // export default async function PostPage({ params }: { params: { id: string } }) {
// //     const user = await getUser();
// //     const post = await getPostById(parseInt(params.id)); // ✅ No more "must await params" error

// //     if (!post) {
// //         return <div className="container mx-auto py-10">Post not found</div>;
// //     }

// //     return (
// //         <div className="container mx-auto py-10">
// //             <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
// //             <p className="text-gray-600 mb-4">By {post.authorEmail}</p>
// //             <p className="mb-6">{post.content}</p>

// //             {user?.id === post.authorId && (
// //                 <div className="space-x-4">
// //                     <Link href={`/blog/${post.id}/edit`}>
// //                         <Button>Edit Post</Button>
// //                     </Link>
// //                     <form action={`/api/blog/${post.id}/delete`} method="POST">
// //                         <Button variant="destructive" type="submit">
// //                             Delete Post
// //                         </Button>
// //                     </form>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }

// // // export const dynamic = 'force-dynamic';
// // // export const runtime = 'nodejs';

// // // import { getPostById } from '@/server/actions/blog';
// // // import { getUser } from '@/lib/db/queries';
// // // import { Button } from '@/components/ui/button';
// // // import Link from 'next/link';

// // // export default async function PostPage({ params }: { params: { id: string } }) {
// // //     const user = await getUser();
// // //     const post = await getPostById(parseInt(params.id)); // ✅ Safe now

// // //     if (!post) {
// // //         return <div className="container mx-auto py-10">Post not found</div>;
// // //     }

// // //     return (
// // //         <div className="container mx-auto py-10">
// // //             <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
// // //             <p className="text-gray-600 mb-4">By {post.authorEmail}</p>
// // //             <p className="mb-6">{post.content}</p>
// // //             {user?.id === post.authorId && (
// // //                 <div className="space-x-4">
// // //                     <Link href={`/blog/${post.id}/edit`}>
// // //                         <Button>Edit Post</Button>
// // //                     </Link>
// // //                     <form action={`/api/blog/${post.id}/delete`} method="POST">
// // //                         <Button variant="destructive" type="submit">
// // //                             Delete Post
// // //                         </Button>
// // //                     </form>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // }

// // // // export const dynamic = 'force-dynamic';
// // // // export const runtime = 'nodejs';

// // // // import { getPosts, getPostById } from '@/server/actions/blog';
// // // // import { getUser } from '@/lib/db/queries';
// // // // import { Button } from '@/components/ui/button';
// // // // import Link from 'next/link';


// // // // export async function generateStaticParams() {
// // // //     const posts = await getPosts(); // Make sure this is defined!
// // // //     return posts.map((post) => ({
// // // //         id: post.id.toString(),
// // // //     }));
// // // // }

// // // // export default async function PostPage({ params }: { params: { id: string } }) {
// // // //     const user = await getUser();
// // // //     const post = await getPostById(parseInt(params.id)); // ✅ Safe now

// // // //     if (!post) {
// // // //         return <div className="container mx-auto py-10">Post not found</div>;
// // // //     }

// // // //     return (
// // // //         <div className="container mx-auto py-10">
// // // //             <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
// // // //             <p className="text-gray-600 mb-4">By {post.authorEmail}</p>
// // // //             <p className="mb-6">{post.content}</p>
// // // //             {user?.id === post.authorId && (
// // // //                 <div className="space-x-4">
// // // //                     <Link href={`/blog/${post.id}/edit`}>
// // // //                         <Button>Edit Post</Button>
// // // //                     </Link>
// // // //                     <form action={`/api/blog/${post.id}/delete`} method="POST">
// // // //                         <Button variant="destructive" type="submit">
// // // //                             Delete Post
// // // //                         </Button>
// // // //                     </form>
// // // //                 </div>
// // // //             )}
// // // //         </div>
// // // //     );
// // // // }

// // // // // import { getPostById, getPosts } from '@/server/actions/blog';
// // // // // // import { getUser } from '@/lib/auth';
// // // // // import { getUser } from '@/lib/db/queries';
// // // // // import { Button } from '@/components/ui/button';
// // // // // import Link from 'next/link';

// // // // // // If you're using getAllPosts or similar to prebuild static routes
// // // // // export async function generateStaticParams() {
// // // // //     const posts = await getPosts(); // Make sure this returns an array of post objects
// // // // //     return posts.map(post => ({
// // // // //         id: post.id.toString(),
// // // // //     }));
// // // // // }

// // // // // export default async function PostPage({ params }: { params: { id: string } }) {

// // // // //     const user = await getUser();
// // // // //     const post = await getPostById(parseInt(params.id));

// // // // //     if (!post) {
// // // // //         return <div className="container mx-auto py-10">Post not found</div>;
// // // // //     }

// // // // //     return (
// // // // //         <div className="container mx-auto py-10">
// // // // //             <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
// // // // //             <p className="text-gray-600 mb-4">By {post.authorEmail}</p>
// // // // //             <p className="mb-6">{post.content}</p>
// // // // //             {user?.id === post.authorId && (
// // // // //                 <div className="space-x-4">
// // // // //                     <Link href={`/blog/${post.id}/edit`}>
// // // // //                         <Button>Edit Post</Button>
// // // // //                     </Link>
// // // // //                     <form action={`/api/blog/${post.id}/delete`} method="POST">
// // // // //                         <Button variant="destructive" type="submit">
// // // // //                             Delete Post
// // // // //                         </Button>
// // // // //                     </form>
// // // // //                 </div>
// // // // //             )}
// // // // //         </div>
// // // // //     );
// // // // // }