import { getPostById } from '@/app/actions/blog';
// import { getUser } from '@/lib/auth';
import { getUser } from '@/lib/db/queries';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function PostPage({ params }: { params: { id: string } }) {
    const post = await getPostById(parseInt(params.id));
    const user = await getUser();

    if (!post) {
        return <div className="container mx-auto py-10">Post not found</div>;
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-4">By {post.authorEmail}</p>
            <p className="mb-6">{post.content}</p>
            {user?.id === post.authorId && (
                <div className="space-x-4">
                    <Link href={`/blog/${post.id}/edit`}>
                        <Button>Edit Post</Button>
                    </Link>
                    <form action={`/api/blog/${post.id}/delete`} method="POST">
                        <Button variant="destructive" type="submit">
                            Delete Post
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
}