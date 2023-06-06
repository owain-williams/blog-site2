import { PrismaClient } from "@prisma/client";
import { UserButton, clerkClient } from "@clerk/nextjs";

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

  const author = await clerkClient.users.getUser(post.authorId);

  return (
    <div className="px-2 py-4 md:px-24 md:py-8 xl:px-48 xl:py-12">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {post.title}
      </h2>
      <sub className="flex text-sm text-muted-foreground">{`by ${
        author.firstName
      } ${author.lastName} - ${post.createdAt.toUTCString()}`}</sub>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{post.content}</p>
    </div>
  );
}
