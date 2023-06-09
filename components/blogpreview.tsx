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
import Link from "next/link";
dayjs.extend(relativeTime);

export default async function BlogPreview(post: Post) {
  const author = await clerkClient.users.getUser(post.authorId);
  return (
    <Card className="w-2/3 m-2 drop-shadow-md" key={post.id}>
      <CardHeader className="flex flex-row flex-wrap justify-between">
        <div className="my-auto">
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>
            {`by ${author.firstName} ${author.lastName}`}
          </CardDescription>
        </div>
        <div className="mt-0">
          <Image
            className="rounded-full"
            src={author.imageUrl}
            width={48}
            height={48}
            alt={`${author.firstName}'s Profile Image`}
          />
        </div>
      </CardHeader>
      <CardContent>
        <p>
          {`${post.content.substring(0, 200)}...`}
          <Link
            href={`/posts/${post.id}`}
            className="text-sm text-muted-foreground pl-4"
          >
            Read More
          </Link>
        </p>
      </CardContent>
      <CardFooter>
        <p>{dayjs(post.createdAt).fromNow()}</p>
      </CardFooter>
    </Card>
  );
}
