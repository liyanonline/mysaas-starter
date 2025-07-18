'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import { useEffect } from 'react';

interface RichTextEditorProps {
    content?: string;
    onChange: (html: string) => void;
}

export default function RichTextEditor({ content = '', onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit, Link, Image, Youtube],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false // ✅ Fix SSR hydration issue
    });

    useEffect(() => {
        return () => editor?.destroy();
    }, [editor]);

    if (!editor) return null;

    return (
        <div className="border p-2 rounded-lg">
            {/* Toolbar */}
            <div className="mb-2 space-x-2">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className="btn">Bold</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className="btn">Italic</button>
                <button onClick={() => {
                    const url = prompt('Enter URL');
                    if (url) editor.chain().focus().setLink({ href: url }).run();
                }} className="btn">Add Link</button>
                <button onClick={() => {
                    const url = prompt('Enter Image URL');
                    if (url) editor.chain().focus().setImage({ src: url }).run();
                }} className="btn">Add Image</button>
                <button onClick={() => {
                    const url = prompt('Enter YouTube URL');
                    if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
                }} className="btn">Add Video</button>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} className="min-h-[200px] border p-2 rounded-md" />
        </div>
    );
}


// 'use client';

// import { EditorContent, useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Link from '@tiptap/extension-link';
// import Image from '@tiptap/extension-image';
// import Youtube from '@tiptap/extension-youtube';
// import React from 'react';

// interface RichTextEditorProps {
//     content?: string;
//     onChange: (html: string) => void;
// }

// export default function RichTextEditor({ content = '', onChange }: RichTextEditorProps) {
//     // ✅ Prevent SSR issues
//     const editor = useEditor({
//         extensions: [StarterKit, Link, Image, Youtube],
//         content,
//         immediatelyRender: false, // <-- Fix for SSR
//         onUpdate: ({ editor }) => {
//             onChange(editor.getHTML());
//         },
//     });

//     if (!editor) return null; // Wait for client mount

//     return (
//         <div className="border rounded-md p-3">
//             <EditorContent editor={editor} />
//         </div>
//     );
// }


// // 'use client';

// // import React from 'react';
// // import { EditorContent, useEditor } from '@tiptap/react';
// // import StarterKit from '@tiptap/starter-kit';
// // import Link from '@tiptap/extension-link';
// // import Image from '@tiptap/extension-image';
// // import Youtube from '@tiptap/extension-youtube';

// // import '@/styles/tiptap.css'; // We'll add some minimal CSS for styling

// // interface RichTextEditorProps {
// //     content?: string;
// //     onChange: (html: string) => void;
// // }

// // export default function RichTextEditor({ content = '', onChange }: RichTextEditorProps) {
// //     const editor = useEditor({
// //         extensions: [StarterKit, Link, Image, Youtube],
// //         content,
// //         onUpdate: ({ editor }) => {
// //             onChange(editor.getHTML()); // ✅ Returns HTML content
// //         },
// //     });

// //     if (!editor) return null;

// //     return (
// //         <div className="border rounded-md p-3">
// //             <MenuBar editor={editor} />
// //             <EditorContent editor={editor} className="min-h-[300px]" />
// //         </div>
// //     );
// // }

// // function MenuBar({ editor }: { editor: any }) {
// //     if (!editor) return null;

// //     return (
// //         <div className="flex gap-2 mb-2">
// //             <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-2 py-1 border">Bold</button>
// //             <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2 py-1 border">Italic</button>
// //             <button onClick={() => editor.chain().focus().setParagraph().run()} className="px-2 py-1 border">Paragraph</button>
// //             <button onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()} className="px-2 py-1 border">H2</button>
// //             <button onClick={() => editor.chain().focus().setLink({ href: prompt('URL') || '' }).run()} className="px-2 py-1 border">Link</button>
// //             <button onClick={() => editor.chain().focus().setImage({ src: prompt('Image URL') || '' }).run()} className="px-2 py-1 border">Image</button>
// //             <button onClick={() => editor.chain().focus().setYoutubeVideo({ src: prompt('YouTube URL') || '' }).run()} className="px-2 py-1 border">YouTube</button>
// //         </div>
// //     );
// // }


// // // import * as React from "react";
// // // import {
// // //     $getRoot,
// // //     $getSelection,
// // //     $isRangeSelection,
// // //     EditorState,
// // //     LexicalEditor,
// // // } from "lexical";
// // // import { LexicalComposer } from "@lexical/react"; // Corrected import
// // // import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"; // Corrected import
// // // import { ContentEditable } from "@lexical/react/LexicalContentEditable"; // Corrected import
// // // import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"; // Corrected import
// // // import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"; // Corrected import
// // // import { Bar } from "react-chartjs-2";
// // // import { Chart as ChartJS, registerables } from "chart.js";
// // // import { cn } from "@/lib/utils";
// // // import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"; // Corrected import

// // // // Register Chart.js components
// // // ChartJS.register(...registerables);

// // // const theme = {
// // //     paragraph: "text-base",
// // // };

// // // function onError(error: any) {
// // //     console.error(error);
// // // }

// // // export interface RichTextEditorProps {
// // //     value?: string;
// // //     onChange?: (html: string) => void;
// // //     className?: string;
// // //     [key: string]: any;
// // // }

// // // const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
// // //     ({ className, value, onChange, ...props }, ref) => {
// // //         const [isClient, setIsClient] = React.useState(false);
// // //         const [editorState, setEditorState] = React.useState<EditorState | null>(null);

// // //         React.useEffect(() => {
// // //             setIsClient(true);
// // //             if (value && isClient) {
// // //                 setEditorState(() => {
// // //                     // Placeholder: Implement HTML to Lexical conversion (e.g., using $generateFromDOM)
// // //                     return null;
// // //                 });
// // //             }
// // //         }, [value, isClient]);

// // //         const initialConfig = {
// // //             namespace: "RichTextEditor",
// // //             theme,
// // //             onError,
// // //             nodes: [], // Add custom nodes (YouTube, Image, Chart) as needed
// // //             editorState: editorState || undefined,
// // //         };

// // //         const onChangeHandler = (
// // //             editorState: EditorState,
// // //             editor: LexicalEditor
// // //         ) => {
// // //             editor.update(() => {
// // //                 const root = $getRoot();
// // //                 const selection = $getSelection();
// // //                 if ($isRangeSelection(selection)) {
// // //                     const html = root.getHTML();
// // //                     if (onChange) onChange(html);
// // //                 }
// // //             });
// // //         };

// // //         if (!isClient) return null;

// // //         return (
// // //             <div
// // //                 className={cn(
// // //                     "w-full rounded-md border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500",
// // //                     className
// // //                 )}
// // //                 ref={ref}
// // //                 {...props}
// // //             >
// // //                 <LexicalComposer initialConfig={initialConfig}>
// // //                     <RichTextPlugin
// // //                         contentEditable={<ContentEditable />}
// // //                         placeholder={<div className="text-gray-400">Start typing...</div>}
// // //                         ErrorBoundary={LexicalErrorBoundary}
// // //                     />
// // //                     <OnChangePlugin onChange={onChangeHandler} />
// // //                     <HistoryPlugin />
// // //                     <div className="p-2 bg-gray-100 flex space-x-2">
// // //                         <button
// // //                             onClick={() =>
// // //                                 editor.update(() => {
// // //                                     const selection = $getSelection();
// // //                                     if ($isRangeSelection(selection)) {
// // //                                         selection.insertText("**Bold**");
// // //                                     }
// // //                                 })
// // //                             }
// // //                             className="px-2 py-1 bg-gray-200 rounded"
// // //                         >
// // //                             Bold
// // //                         </button>
// // //                         <button
// // //                             onClick={() =>
// // //                                 editor.update(() => {
// // //                                     const selection = $getSelection();
// // //                                     if ($isRangeSelection(selection)) {
// // //                                         selection.insertText("_Italic_");
// // //                                     }
// // //                                 })
// // //                             }
// // //                             className="px-2 py-1 bg-gray-200 rounded"
// // //                         >
// // //                             Italic
// // //                         </button>
// // //                     </div>
// // //                     {value && /<div data-type="chart"><\/div>/.test(value) && (
// // //                         <Bar
// // //                             data={{
// // //                                 labels: ["Jan", "Feb", "Mar"],
// // //                                 datasets: [
// // //                                     {
// // //                                         label: "Sample Data",
// // //                                         data: [10, 20, 30],
// // //                                         backgroundColor: "rgba(75, 192, 192, 0.2)",
// // //                                         borderColor: "rgba(75, 192, 192, 1)",
// // //                                         borderWidth: 1,
// // //                                     },
// // //                                 ],
// // //                             }}
// // //                             options={{ responsive: true, maintainAspectRatio: false }}
// // //                             className="w-full h-64 mt-4"
// // //                         />
// // //                     )}
// // //                 </LexicalComposer>
// // //             </div>
// // //         );
// // //     }
// // // );

// // // RichTextEditor.displayName = "RichTextEditor";

// // // export { RichTextEditor };

// // // // import * as React from "react";
// // // // import { useEditor, EditorContent } from "@tiptap/react";
// // // // import StarterKit from "@tiptap/starter-kit";
// // // // import Link from "@tiptap/extension-link";
// // // // import YouTube from "@tiptap/extension-youtube";
// // // // import Image from "@tiptap/extension-image";
// // // // import { BubbleMenu as BubbleMenuExtension } from "@tiptap/extension-bubble-menu"; // Renamed to avoid confusion
// // // // import { Bar } from "react-chartjs-2";
// // // // import { Chart as ChartJS, registerables } from "chart.js";
// // // // import { cn } from "@/lib/utils";

// // // // // Custom BubbleMenu component
// // // // const CustomBubbleMenu = ({ editor }: { editor: any }) => {
// // // //     if (!editor) return null;

// // // //     return (
// // // //         <div className="bg-white border rounded shadow-lg p-1 flex space-x-1" style={{ position: 'absolute', zIndex: 1000 }}>
// // // //             <button
// // // //                 onClick={() => editor.chain().focus().toggleBold().run()}
// // // //                 className={editor.isActive("bold") ? "bg-gray-200" : ""}
// // // //             >
// // // //                 Bold
// // // //             </button>
// // // //             <button
// // // //                 onClick={() => editor.chain().focus().toggleItalic().run()}
// // // //                 className={editor.isActive("italic") ? "bg-gray-200" : ""}
// // // //             >
// // // //                 Italic
// // // //             </button>
// // // //             <button
// // // //                 onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
// // // //                 className={editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}
// // // //             >
// // // //                 H2
// // // //             </button>
// // // //             <button
// // // //                 onClick={() => editor.chain().focus().setLink().run()}
// // // //                 className={editor.isActive("link") ? "bg-gray-200" : ""}
// // // //             >
// // // //                 Link
// // // //             </button>
// // // //             <button
// // // //                 onClick={() => editor.chain().focus().setYoutubeVideo().run()}
// // // //                 className={editor.isActive("youtube") ? "bg-gray-200" : ""}
// // // //             >
// // // //                 YouTube
// // // //             </button>
// // // //             <button
// // // //                 onClick={() => editor.chain().focus().setImage({ src: prompt("Enter image URL") || "" }).run()}
// // // //                 className={editor.isActive("image") ? "bg-gray-200" : ""}
// // // //             >
// // // //                 Image
// // // //             </button>
// // // //             <button
// // // //                 onClick={() => editor.chain().focus().insertContent('<div><Bar data={/* your chart data */} /></div>').run()}
// // // //                 className="bg-gray-200"
// // // //             >
// // // //                 Add Graph
// // // //             </button>
// // // //         </div>
// // // //     );
// // // // };

// // // // ChartJS.register(...registerables);

// // // // export interface RichTextEditorProps {
// // // //     value?: string;
// // // //     onChange?: (html: string) => void;
// // // //     className?: string;
// // // //     [key: string]: any;
// // // // }

// // // // const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
// // // //     ({ className, value, onChange, ...props }, ref) => {
// // // //         const [isClient, setIsClient] = React.useState(false);

// // // //         React.useEffect(() => {
// // // //             setIsClient(true);
// // // //         }, []);

// // // //         const editor = useEditor({
// // // //             extensions: [
// // // //                 StarterKit,
// // // //                 Link.configure({
// // // //                     openOnClick: false,
// // // //                 }),
// // // //                 YouTube.configure({
// // // //                     width: 640,
// // // //                     height: 480,
// // // //                 }),
// // // //                 Image.configure({
// // // //                     inline: true,
// // // //                 }),
// // // //                 BubbleMenuExtension.configure({
// // // //                     element: document.querySelector('.bubble-menu') || undefined, // Optional: configure element
// // // //                 }),
// // // //             ],
// // // //             content: value || "<p>Start typing...</p>",
// // // //             onUpdate: ({ editor }) => {
// // // //                 const html = editor.getHTML();
// // // //                 if (onChange) onChange(html);
// // // //             },
// // // //             immediatelyRender: false,
// // // //         });

// // // //         if (!isClient || !editor) return null;

// // // //         return (
// // // //             <div
// // // //                 className={cn(
// // // //                     "w-full rounded-md border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 relative",
// // // //                     className
// // // //                 )}
// // // //                 ref={ref}
// // // //                 {...props}
// // // //             >
// // // //                 {editor && <CustomBubbleMenu editor={editor} />}
// // // //                 <EditorContent editor={editor} className="min-h-[200px] p-3 text-sm" />
// // // //                 {editor.getJSON().content.some((node) => node.type === "chart") && (
// // // //                     <Bar
// // // //                         data={{
// // // //                             labels: ["Jan", "Feb", "Mar"],
// // // //                             datasets: [
// // // //                                 {
// // // //                                     label: "Sample Data",
// // // //                                     data: [10, 20, 30],
// // // //                                     backgroundColor: "rgba(75, 192, 192, 0.2)",
// // // //                                     borderColor: "rgba(75, 192, 192, 1)",
// // // //                                     borderWidth: 1,
// // // //                                 },
// // // //                             ],
// // // //                         }}
// // // //                         options={{ responsive: true, maintainAspectRatio: false }}
// // // //                         className="w-full h-64 mt-4"
// // // //                     />
// // // //                 )}
// // // //             </div>
// // // //         );
// // // //     }
// // // // );

// // // // RichTextEditor.displayName = "RichTextEditor";

// // // // export { RichTextEditor };
