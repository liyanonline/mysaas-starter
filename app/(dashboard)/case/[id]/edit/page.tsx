import { getCaseById } from '@/server/actions/case';
import EditCaseForm from './EditCaseForm';
import { notFound } from 'next/navigation';

// Define the expected caseItem type based on getCaseById return
interface CaseItem {
    id: number;
    title: string;
    description: string | null;
    createdAt: Date | null;
    authorId: number;
    authorEmail: string | null;
}

export default async function EditCasePage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const caseItem = await getCaseById(Number(id));

    if (!caseItem) {
        notFound();
    }

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-6 bg-gradient-to-r from-indigo-100 to-white border-b">
                    <h1 className="text-3xl font-bold text-gray-900">Edit Case</h1> {/* Updated to "Edit Case" */}
                </div>
                <div className="px-6 py-6">
                    <EditCaseForm caseItem={caseItem} />
                </div>
            </div>
        </div>
    );
}

// import { getCaseById } from '@/server/actions/case';
// import EditCaseForm from './EditCaseForm';
// import { notFound } from 'next/navigation';

// export default async function EditCasePage({ params }: { params: Promise<{ id: number; title: string; description: string | null }> }) {
//     const { id } = await params;
//     const caseItem = await getCaseById(Number(id));

//     if (!caseItem) {
//         notFound();
//     }

//     return (
//         <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//                 <div className="px-6 py-6 bg-gradient-to-r from-indigo-100 to-white border-b">
//                     <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
//                 </div>
//                 <div className="px-6 py-6">
//                     <EditCaseForm caseItem={caseItem} />
//                 </div>
//             </div>
//         </div>
//     );
// }

// // import { getPostById } from '@/server/actions/case';
// // import EditPostForm from './EditPostForm';

// // export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
// //     const { id } = await params; // Resolve the Promise
// //     const post = await getPostById(Number(id));

// //     if (!post) {
// //         return <div className="container mx-auto py-10">Post not found</div>;
// //     }

// //     return <EditPostForm post={post} />;
// // }

// // // // app/case/[id]/edit/page.tsx
// // // import { getPostById } from '@/server/actions/case';
// // // import EditPostForm from './EditPostForm';
// // // import { notFound } from 'next/navigation';

// // // export default async function EditPostPage({ params }: { params: { id: string } }) {
// // //     const post = await getPostById(Number(params.id));

// // //     if (!post) {
// // //         notFound();
// // //     }

// // //     return <EditPostForm post={post} />;
// // // }
