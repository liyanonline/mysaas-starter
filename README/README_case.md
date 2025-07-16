要添加一个 **PostgreSQL-backed CaseBase 功能**，支持 **注册用户和管理员编辑 Case**，你可以按以下步骤集成到你的 Next.js + Drizzle ORM + PostgreSQL 应用中：

---

## ✅ 1. 数据库建表 (`cases`)

创建 `cases` 表的 schema：

```ts
// lib/db/schema/case.ts
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const cases = pgTable('cases', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  authorId: integer('author_id').references(() => users.id), // assuming users table exists
});
```

---

## ✅ 2. 添加 Drizzle 查询函数

```ts
// lib/db/queries/case.ts
import { db } from '../drizzle';
import { cases } from '../schema/case';
import { eq } from 'drizzle-orm';

export async function getAllCases() {
  return db.select().from(cases).orderBy(cases.updatedAt);
}

export async function getCaseById(id: number) {
  const [result] = await db.select().from(cases).where(eq(cases.id, id));
  return result;
}

export async function createCase(data: { title: string; description: string; authorId: number }) {
  return db.insert(cases).values(data);
}

export async function updateCase(id: number, data: { title: string; description: string }) {
  return db.update(cases).set({
    ...data,
    updatedAt: new Date(),
  }).where(eq(cases.id, id));
}
```

---

## ✅ 3. 定义类型

```ts
// types/case.ts
import { cases } from '@/lib/db/schema/case';

export type Case = typeof cases.$inferSelect;
export type NewCase = typeof cases.$inferInsert;
```

---

## ✅ 4. 后端 API actions

```ts
// app/actions/case.ts
'use server';

import { createCase, updateCase } from '@/lib/db/queries/case';
import { getUser } from '@/lib/db/queries'; // getUser should return current session user

export async function createCaseAction(formData: FormData) {
  const user = await getUser();
  if (!user) return { error: 'Unauthorized' };

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  await createCase({ title, description, authorId: user.id });
  return { success: true };
}

export async function updateCaseAction(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  await updateCase(id, { title, description });
  return { success: true };
}
```

---

## ✅ 5. 页面结构（仅注册用户可编辑）

### Case 列表页：

```tsx
// app/case/page.tsx
import Link from 'next/link';
import { getAllCases } from '@/lib/db/queries/case';

export default async function CaseListPage() {
  const allCases = await getAllCases();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Case List</h1>
      <ul className="mt-4 space-y-2">
        {allCases.map(c => (
          <li key={c.id}>
            <Link href={`/case/${c.id}/edit`} className="text-blue-600 hover:underline">
              {c.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Case 编辑页：

```tsx
// app/case/[id]/edit/page.tsx
import { getCaseById } from '@/lib/db/queries/case';
import EditCaseForm from '@/components/case/EditCaseForm';
import { notFound } from 'next/navigation';

export default async function EditCasePage({ params }: { params: { id: string } }) {
  const caseItem = await getCaseById(Number(params.id));
  if (!caseItem) return notFound();

  return <EditCaseForm caseData={caseItem} />;
}
```

### Case 编辑表单组件：

```tsx
// components/case/EditCaseForm.tsx
'use client';

import { updateCaseAction } from '@/app/actions/case';
import { useActionState } from 'react';

export default function EditCaseForm({ caseData }: { caseData: { id: number; title: string; description: string } }) {
  const [state, formAction] = useActionState(updateCaseAction.bind(null, caseData.id), { success: false });

  return (
    <form action={formAction} className="space-y-4 p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold">Edit Case</h1>
      <input name="title" defaultValue={caseData.title} className="w-full border px-2 py-1" required />
      <textarea name="description" defaultValue={caseData.description} className="w-full border px-2 py-1" rows={5} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Update</button>
    </form>
  );
}
```

---

## ✅ 6. 权限控制（可选增强）

* 在 `updateCaseAction` 中加上权限校验，比如：

  ```ts
  if (user.id !== case.authorId && user.role !== 'admin') {
    return { error: 'Forbidden' };
  }
  ```

---

## ✅ 7. 后续可选拓展

* 增加 slug 并展示详情页 `/case/[slug]`
* 添加评论、标签、状态（开放、已解决）
* 按用户过滤 case 列表

---

需要我帮你一起加上管理员专属的 Case 后台页面或者加上角色判断逻辑，也可以继续发我。你要不要我帮你生成一个完整的 `case` 模块代码包？
