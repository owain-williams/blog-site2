import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function Dashboard() {

  // This function is called when the form is submitted
  // It's a new way of working in Next 13 using "Server Actions"
  // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
  async function addPost(formData: FormData) {
    "use server";

    const user = await currentUser();
    if (!user) {
      return "";
    }

    const newPost = {
      title: formData.get("postTitle")?.toString() ?? "Untitled",
      content: formData.get("postContents")?.toString() ?? "No content",
      published: true,
      authorId: user.id,
    };
    const post = await prisma.post.create({
      data: newPost,
    });
    redirect(`/posts/${post.id}`);
  }
  return (
    <main className="flex flex-col items-center justify-between px-24 py-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Write
      </h1>
      <sub className="text-xl text-muted-foreground">
        Your shitty blog post here
      </sub>
      <form className="grid w-full gap-2 pt-8" action={addPost}>
        <Input name="postTitle" placeholder="Title" />
        <Textarea
          name="postContents"
          placeholder="Type your shitty post here."
        />
        <Button type="submit">Publish Post</Button>
      </form>
    </main>
  );
}
