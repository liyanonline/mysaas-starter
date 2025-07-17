import { getUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import NewPostForm from './form'; // 👈 client component

export default async function NewPostPage() {
    const user = await getUser();
    if (!user) redirect('/sign-in');

    return <NewPostForm />;
}

// import { createPost } from '@/server/actions/case';
// import { getUser } from '@/lib/db/queries';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { redirect } from 'next/navigation';

// export default async function NewPostPage() {
//     const user = await getUser();

//     if (!user) {
//         redirect('/sign-in'); // Adjust the redirect path as needed
//     }

//     const action = async (formData: FormData) => {
//         'use server';
//         const result = await createPost(null, formData);
//         if (result.success) {
//             redirect('/case');
//         } else if (result.error) {
//             // Optionally log the error or throw it for debugging
//             console.error('Create post failed:', result.error);
//             // You could redirect to an error page or re-render with an error message
//             // For now, let's just redirect back to the form page
//             redirect('/dashboard/case/new?error=' + encodeURIComponent(result.error));
//         }
//     };

//     return (
//         <div className="container mx-auto py-10">
//             <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
//             {/* Check for error query parameter and display if present */}
//             {new URLSearchParams(window.location.search).get('error') && (
//                 <p className="text-red-500 mb-4">
//                     Error: {new URLSearchParams(window.location.search).get('error')}
//                 </p>
//             )}
//             <form action={action} className="space-y-4">
//                 <div>
//                     <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//                         Title
//                     </label>
//                     <Input id="title" name="title" required className="mt-1" />
//                 </div>
//                 <div>
//                     <label htmlFor="content" className="block text-sm font-medium text-gray-700">
//                         Content
//                     </label>
//                     <Textarea id="content" name="content" required rows={10} className="mt-1" />
//                 </div>
//                 <Button type="submit" className="mt-4">
//                     Create Post
//                 </Button>
//             </form>
//         </div>
//     );
// }


// // import { createPost, getPosts } from '@/server/actions/case';
// // import { getUser } from '@/lib/db/queries';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Textarea } from '@/components/ui/textarea';
// // import { redirect } from 'next/navigation';

// // export default async function NewPostPage() {
// //     // Fetch user server-side to check authentication
// //     const user = await getUser();

// //     // Redirect if not authenticated
// //     if (!user) {
// //         redirect('/sign-in'); // Adjust the redirect path as needed
// //     }

// //     // Define the server action for form submission
// //     const action = async (formData: FormData) => {
// //         'use server';
// //         const result = await createPost(null, formData); // Pass _prevState as null since not using useActionState
// //         if (result.success) {
// //             redirect('/case'); // Redirect to case list after success
// //         }
// //         return result; // Return error or success state for potential client-side handling (though not used here)
// //     };

// //     return (
// //         <div className="container mx-auto py-10">
// //             <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
// //             <form action={action} className="space-y-4">
// //                 <div>
// //                     <label htmlFor="title" className="block text-sm font-medium text-gray-700">
// //                         Title
// //                     </label>
// //                     <Input id="title" name="title" required className="mt-1" />
// //                 </div>
// //                 <div>
// //                     <label htmlFor="content" className="block text-sm font-medium text-gray-700">
// //                         Content
// //                     </label>
// //                     <Textarea id="content" name="content" required rows={10} className="mt-1" />
// //                 </div>
// //                 <Button type="submit" className="mt-4">
// //                     Create Post
// //                 </Button>
// //             </form>
// //         </div>
// //     );
// // }


// // // import { getUser } from '@/lib/db/queries';
// // // import { redirect } from 'next/navigation';
// // // import NewPostForm from './form';

// // // export default async function NewPostPage() {
// // //     const user = await getUser();
// // //     console.log('User in NewPostPage:', user);
// // //     if (!user) {
// // //         redirect('/sign-in');
// // //     }

// // //     return <NewPostForm />;
// // // }
// // // // import { getUser } from '@/lib/db/queries';
// // // // import { createPost } from '@/server/actions/case';
// // // // import { redirect } from 'next/navigation';
// // // // import { Button } from '@/components/ui/button';
// // // // import { Input } from '@/components/ui/input';
// // // // import { Textarea } from '@/components/ui/textarea';
// // // // import { useActionState } from 'react';

// // // // export default async function NewPostPage() {
// // // //     const user = await getUser();

// // // //     if (!user) {
// // // //         redirect('/sign-in'); // ✅ Redirect unauthenticated users
// // // //     }

// // // //     const [state, formAction] = await useActionState(createPost, {
// // // //         error: null,
// // // //         success: false
// // // //     });

// // // //     return (
// // // //         <div className="container mx-auto py-10">
// // // //             <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
// // // //             {state?.error && <p className="text-red-500 mb-4">{state.error}</p>}
// // // //             <form action={formAction} className="space-y-4">
// // // //                 <div>
// // // //                     <label htmlFor="title" className="block text-sm font-medium">
// // // //                         Title
// // // //                     </label>
// // // //                     <Input id="title" name="title" required />
// // // //                 </div>
// // // //                 <div>
// // // //                     <label htmlFor="content" className="block text-sm font-medium">
// // // //                         Content
// // // //                     </label>
// // // //                     <Textarea id="content" name="content" required rows={10} />
// // // //                 </div>
// // // //                 <Button type="submit">Create Post</Button>
// // // //             </form>
// // // //         </div>
// // // //     );
// // // // }


// // // // // 'use client';

// // // // // import { useActionState } from 'react';
// // // // // import { createPost } from '@/server/actions/case';
// // // // // import { Button } from '@/components/ui/button';
// // // // // import { Input } from '@/components/ui/input';
// // // // // import { Textarea } from '@/components/ui/textarea';
// // // // // import { useRouter } from 'next/navigation';
// // // // // import { useEffect } from 'react';

// // // // // export default function NewPostPage() {

// // // // //     const [state, formAction] = useActionState(createPost, { error: null, success: false });
// // // // //     const router = useRouter();

// // // // //     useEffect(() => {
// // // // //         if (state.success) {
// // // // //             router.push('/case');
// // // // //         }
// // // // //     }, [state.success, router]);

// // // // //     return (
// // // // //         <div className="container mx-auto py-10">
// // // // //             <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
// // // // //             {state.error && <p className="text-red-500 mb-4">{state.error}</p>}
// // // // //             <form action={formAction} className="space-y-4">
// // // // //                 <div>
// // // // //                     <label htmlFor="title" className="block text-sm font-medium">
// // // // //                         Title
// // // // //                     </label>
// // // // //                     <Input id="title" name="title" required />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                     <label htmlFor="content" className="block text-sm font-medium">
// // // // //                         Content
// // // // //                     </label>
// // // // //                     <Textarea id="content" name="content" required rows={10} />
// // // // //                 </div>
// // // // //                 <Button type="submit">Create Post</Button>
// // // // //             </form>
// // // // //         </div>
// // // // //     );
// // // // // }