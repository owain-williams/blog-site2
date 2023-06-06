import { currentUser, UserButton } from "@clerk/nextjs";
import { PrismaClient, Post } from "@prisma/client";
import { Button } from "@/components/ui/button";
import BlogPreview from "@/components/blogpreview";
import BlogPreviewSkeleton from "@/components/blogpreviewskeleton";
import { Suspense } from "react";

const prisma = new PrismaClient();

export default async function Home() {
  // Get the USER
  const user = await currentUser();

  if (!user) {
    return "";
  }

  // Get the user's posts
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="flex flex-col items-center justify-between px-24 py-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Blog Site
      </h1>
      <sub className="text-xl text-muted-foreground">
        Welcome to the worst blog site
      </sub>
      <br />
      <Suspense fallback={<BlogPreviewSkeleton />}>
        {posts.map((post: Post) => (
          <BlogPreview key={post.id} {...post} />
        ))}
      </Suspense>
    </main>
  );
}
