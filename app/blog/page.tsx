import { getPosts } from '@/app/actions/blog';
import { getUser } from '@/lib/db/queries';
import BlogListClient from './BlogListClient';

export default async function BlogPage() {
    const [posts, user] = await Promise.all([getPosts(), getUser()]);

    return <BlogListClient posts={posts} user={user} />;
}

// 'use client';

// import { getPosts } from '@/app/actions/blog';
// import { getUser } from '@/lib/db/queries';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { useTransition } from 'react';
// import { useRouter } from 'next/navigation';

// export default async function BlogPage() {
//     const [posts, user] = await Promise.all([getPosts(), getUser()]);
//     const router = useRouter();

//     const deletePost = async (id: number) => {
//         await fetch(`/blog/${id}/delete`, { method: 'POST' });
//         router.refresh(); // Re-fetch posts after delete
//     };

//     return (
//         <div className="container mx-auto py-10">
//             <h1 className="text-3xl font-bold mb-6">Blog</h1>

//             {user && (
//                 <Link href="/blog/new">
//                     <Button>Create New Post</Button>
//                 </Link>
//             )}

//             <div className="mt-6 space-y-4">
//                 {posts.length === 0 && <p>No posts yet.</p>}
//                 {posts.map((post) => (
//                     <div key={post.id} className="border p-4 rounded-lg">
//                         <h2 className="text-xl font-semibold">{post.title}</h2>
//                         <p className="text-gray-600">By {post.authorEmail}</p>
//                         <p className="mt-2">{post.content.substring(0, 100)}...</p>

//                         <div className="flex space-x-4 mt-4">
//                             <Link href={`/blog/${post.id}`}>
//                                 <Button variant="link">Read More</Button>
//                             </Link>

//                             {user && user.email === post.authorEmail && (
//                                 <form
//                                     onSubmit={async (e) => {
//                                         e.preventDefault();
//                                         await deletePost(post.id);
//                                     }}
//                                 >
//                                     <Button type="submit" variant="destructive">
//                                         Delete
//                                     </Button>
//                                 </form>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
// // import { getPosts } from '@/app/actions/blog';
// // import { getUser } from '@/lib/db/queries';
// // import Link from 'next/link';
// // import { Button } from '@/components/ui/button';

// // // export default async function BlogPage() {
// // //     const posts = await getPosts();
// // export default async function BlogPage() {
// //     const [posts, user] = await Promise.all([
// //         getPosts(),
// //         getUser() // ✅ Check if user is signed in
// //     ]);

// //     return (
// //         <div className="container mx-auto py-10">
// //             <h1 className="text-3xl font-bold mb-6">Blog</h1>

// //             {/* ✅ Show only if logged in */}
// //             {user && (
// //                 <Link href="/blog/new">
// //                     <Button>Create New Post</Button>
// //                 </Link>
// //             )}
// //             <div className="mt-6 space-y-4">
// //                 {posts.length === 0 && <p>No posts yet.</p>}
// //                 {posts.map((post) => (
// //                     <div key={post.id} className="border p-4 rounded-lg">
// //                         <h2 className="text-xl font-semibold">{post.title}</h2>
// //                         <p className="text-gray-600">By {post.authorEmail}</p>
// //                         <p className="mt-2">{post.content.substring(0, 100)}...</p>
// //                         <Link href={`/blog/${post.id}`}>
// //                             <Button variant="link">Read More</Button>
// //                         </Link>
// //                     </div>
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // }