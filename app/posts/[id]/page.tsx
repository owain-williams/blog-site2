import { clerkClient } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!post) {
    return <div>Post not found.</div>;
  }

  // Get the author of the post, this may not be the logged in user
  const author = await clerkClient.users.getUser(post.authorId);

  return (
    <div className="flex flex-col items-center h-[calc(100vh-4rem)] px-0 md:px-24 py-8 bg-gradient-to-r from-indigo-50 from-10% via-sky-50 via-30% to-emerald-50 to-90%">
      <div className="flex flex-col bg-white p-8 rounded-md shadow-md">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          {post.title}
        </h2>
        <sub className="flex text-sm text-muted-foreground">{`by ${
          author.firstName
        } ${author.lastName} - ${post.createdAt.toUTCString()}`}</sub>
        <p className="leading-7 [&:not(:first-child)]:mt-6">{post.content}</p>
      </div>
    </div>
  );
}
