import { getPosts } from '@/server/actions/blog';
import { getUser } from '@/lib/db/queries';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
// import DOMPurify from 'dompurify';
import { sanitizeHTML } from '@/utils/sanitize';


// export default async function BlogPage() {
//     const posts = await getPosts();
export default async function BlogPage() {
    const [posts, user] = await Promise.all([
        getPosts(),
        getUser() // ✅ Check if user is signed in
    ]);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Blog</h1>

            {/* ✅ Show only if logged in */}
            {user && (
                <Link href="/blog/new">
                    <Button>Create New Post</Button>
                </Link>
            )}
            <div className="mt-6 space-y-4">
                {posts.length === 0 && <p>No posts yet.</p>}
                {posts.map((post) => (
                    <div key={post.id} className="border p-4 rounded-lg">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-600">By {post.authorEmail}</p>
                        {/* <p className="mt-2">{post.content.substring(0, 100)}...</p> */}
                        {/* const safeContent = DOMPurify.sanitize(post.content);
                        <div
                            className="mt-2 prose max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: post.content.length > 100
                                    ? post.content.substring(0, 100) + '...'
                                    : post.content
                            }}
                        /> */}

                        <div
                            className="mt-2 prose"
                            dangerouslySetInnerHTML={{ __html: sanitizeHTML(post.content.substring(0, 100)) }}
                        />

                        <Link href={`/blog/${post.id}`}>
                            <Button variant="link">Read More</Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
