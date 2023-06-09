import BlogPreview from "@/components/blogpreview";
import BlogPreviewSkeleton from "@/components/blogpreviewskeleton";
import { currentUser } from "@clerk/nextjs";
import { Post, PrismaClient } from "@prisma/client";
import { Suspense } from "react";

const prisma = new PrismaClient();

export default async function Home() {
  // Get all posts
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="flex flex-col items-center justify-between px-0 md:px-24 py-8 bg-gradient-to-r from-indigo-50 from-10% via-sky-50 via-30% to-emerald-50 to-90%">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Blog Site
      </h1>
      <sub className="text-xl text-muted-foreground">
        Leave your blog post for others to read
      </sub>
      <br />
      {/* This displays a "Skeleton" while the posts are being fetched */}
      <Suspense fallback={<BlogPreviewSkeleton />}>
        {posts.map((post: Post) => (
          <BlogPreview key={post.id} {...post} />
        ))}
      </Suspense>
    </main>
  );
}
