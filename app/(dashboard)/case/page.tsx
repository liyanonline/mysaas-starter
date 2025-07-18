import { getCases } from '@/server/actions/case';
import { getUser } from '@/lib/db/queries';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { sanitizeHTML } from '@/utils/sanitize';

// export default async function casePage() {
//     const posts = await getPosts();
export default async function casePage() {
    const [cases, user] = await Promise.all([
        getCases(),
        getUser() // ✅ Check if user is signed in
    ]);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">case</h1>

            {/* ✅ Show only if logged in */}
            {user && (
                <Link href="/case/new">
                    <Button>Create New Case</Button>
                </Link>
            )}
            <div className="mt-6 space-y-4">
                {cases.length === 0 && <p>No case yet.</p>}
                {cases.map((caseItem) => (
                    <div key={caseItem.id} className="border p-4 rounded-lg">
                        <h2 className="text-xl font-semibold">{caseItem.title}</h2>
                        <p className="text-gray-600">By {caseItem.authorEmail}</p>
                        {/* <p className="mt-2">{post.content.substring(0, 100)}...</p> */}

                        {/* <div
                            className="mt-2 prose"
                            dangerouslySetInnerHTML={{ __html: sanitizeHTML(caseItem.description.substring(0, 100)) }}
                        /> */}

                        {caseItem.description && (
                            <div
                                className="mt-2 prose"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHTML(caseItem.description.substring(0, 100))
                                }}
                            />
                        )}


                        <Link href={`/case/${caseItem.id}`}>
                            <Button variant="link">Read More</Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
