'use client';

import { useActionState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createCase } from '@/server/actions/case';
import { Button } from '@/components/ui/button';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';

export default function NewCaseForm() {
    const [state, formAction] = useActionState(createCase, {
        error: null,
        success: false,
    });
    const router = useRouter();
    const searchParams = useSearchParams();

    const errorParam = searchParams.get('error');

    useEffect(() => {
        if (state.success) {
            router.push('/case');
        }
    }, [state.success, router]);

    const handleEditorChange = (html: string) => {
        const input = document.querySelector<HTMLInputElement>('input[name="description"]');
        if (input) {
            input.value = html;
        } else {
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'description';
            hiddenInput.value = html;
            document.querySelector('form')?.appendChild(hiddenInput);
        }
    };

    // const handleEditorChange = (html: string) => {
    //     console.log('Editor content changed:', html); // Debug log
    //     const input = document.createElement('input');
    //     input.type = 'hidden';
    //     input.name = 'description';
    //     input.value = html;
    //     document.querySelector('form')?.appendChild(input);
    // };


    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Create New Case</h1>

            {errorParam && (
                <p className="text-red-500 mb-4">
                    Error: {errorParam}
                </p>
            )}

            {state.error && (
                <p className="text-red-500 mb-4">{state.error}</p>
            )}

            <form action={formAction} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                    <Input id="title" name="title" required />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium">Description</label>
                    <RichTextEditor
                        id="description"
                        name="description"
                        onChange={handleEditorChange}
                    />
                </div>
                <Button type="submit">Create Case</Button>
            </form>
        </div>
    );
}

// // --------------------------------
// //  Textarea version:
// // --------------------------------
// 'use client';

// import { useActionState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { createCase } from '@/server/actions/case';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { useEffect } from 'react';

// export default function NewCaseForm() {
//     const [state, formAction] = useActionState(createCase, {
//         error: null,
//         success: false,
//     });
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const errorParam = searchParams.get('error');

//     useEffect(() => {
//         if (state.success) {
//             router.push('/case'); // Updated to case route
//         }
//     }, [state.success, router]);

//     return (
//         <div className="container mx-auto py-10">
//             <h1 className="text-3xl font-bold mb-6">Create New Case</h1> {/* Updated title */}

//             {errorParam && (
//                 <p className="text-red-500 mb-4">
//                     Error: {errorParam}
//                 </p>
//             )}

//             {state.error && (
//                 <p className="text-red-500 mb-4">{state.error}</p>
//             )}

//             <form action={formAction} className="space-y-4">
//                 <div>
//                     <label htmlFor="title" className="block text-sm font-medium">Title</label>
//                     <Input id="title" name="title" required />
//                 </div>
//                 <div>
//                     <label htmlFor="description" className="block text-sm font-medium">Description</label> {/* Updated from content */}
//                     <Textarea id="description" name="description" required rows={10} /> {/* Updated from content */}
//                 </div>
//                 <Button type="submit">Create Case</Button> {/* Updated button text */}
//             </form>
//         </div>
//     );
// }

