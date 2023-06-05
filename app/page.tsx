import { currentUser, UserButton } from "@clerk/nextjs";
import { PrismaClient, Post } from "@prisma/client";
import { Button } from "@/components/ui/button";

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
      authorId: user.id,
      published: true,
    },
  });

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <UserButton />
      <h2>Hello there {user.id}</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
      <Button variant="outline">I am the button</Button>
    </main>
  );
}
