'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Post {
    id: number;
    title: string;
    authorEmail: string | null;
    content: string;
}

interface Props {
    posts: Post[];
    user: { email: string } | null;
}

export default function BlogListClient({ posts, user }: Props) {
    const router = useRouter();

    const handleDelete = async (id: number) => {
        const res = await fetch(`/blog/${id}/delete`, {
            method: 'POST',
        });

        if (res.ok) {
            // // Redirect to the previous page or fallback to /blog
            // const previousPage = document.referrer || '/blog';
            // router.push(previousPage);
            router.refresh();
        } else {
            const { error } = await res.json();
            alert(`Delete failed: ${error}`);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Blog</h1>

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
                        <p className="mt-2">{post.content.substring(0, 100)}...</p>

                        <div className="flex space-x-4 mt-4">
                            <Link href={`/blog/${post.id}`}>
                                <Button variant="link">Read More</Button>
                            </Link>

                            {user?.email === post.authorEmail && (
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDelete(post.id)}
                                >
                                    Delete
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
