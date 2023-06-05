import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { clerkClient } from "@clerk/nextjs";
import { Post } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "lucide-react";
dayjs.extend(relativeTime);

export default async function BlogPreview(post: Post) {
  const author = await clerkClient.users.getUser(post.authorId);
  return (
    <Card className="w-2/3 m-2 drop-shadow-md" key={post.id}>
      <CardHeader>
        <Image
          className="rounded-full ml-auto absolute right-6"
          src={author.imageUrl}
          width={48}
          height={48}
          alt={`${author.firstName}'s Profile Image`}
        />
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>
          {`by ${author.firstName} ${author.lastName}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{`${post.content.substring(0, 200)}...`}</p>
      </CardContent>
      <CardFooter>
        <p>{dayjs(post.createdAt).fromNow()}</p>
        <Link href="/posts/[id]" className="ml-auto absolute right-6">
          Read More...
        </Link>
      </CardFooter>
    </Card>
  );
}
