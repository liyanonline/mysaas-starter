// upload to public/uploads directory
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';


export async function POST(req: Request) {
    try {
        const data = await req.formData();
        const file = data.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Read file into buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save file to public/uploads
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        // Return URL for public access
        const url = `/uploads/${fileName}`;
        return NextResponse.json({ url });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
// import { NextResponse } from 'next/server';
// import path from 'path';
// import fs from 'fs/promises';

// export async function POST(req: Request) {
//     try {
//         const formData = await req.formData();
//         const file = formData.get('file') as File | null;

//         if (!file) {
//             return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//         }

//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);

//         const uploadDir = path.join(process.cwd(), 'public', 'uploads');
//         await fs.mkdir(uploadDir, { recursive: true });

//         const fileName = `${Date.now()}-${file.name}`;
//         const filePath = path.join(uploadDir, fileName);

//         await fs.writeFile(filePath, buffer);

//         return NextResponse.json({ url: `/uploads/${fileName}` });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
//     }
// }


// // // app/api/upload/route.ts
// // import { NextResponse } from 'next/server';
// // import { writeFile } from 'fs/promises';
// // import path from 'path';

// // export async function POST(req: Request) {
// //     const formData = await req.formData();
// //     const file = formData.get('file') as File;

// //     if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

// //     const bytes = await file.arrayBuffer();
// //     const buffer = Buffer.from(bytes);
// //     const filePath = path.join(process.cwd(), 'public/uploads', file.name);

// //     await writeFile(filePath, buffer);

// //     return NextResponse.json({ url: `/uploads/${file.name}` });
// // }
