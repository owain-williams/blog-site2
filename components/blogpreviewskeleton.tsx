import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Post } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";

export default function BlogPreviewSkeleton() {
  return (
    <Card className="w-2/3 m-2 drop-shadow-md">
      <CardHeader className="flex flex-row flex-wrap justify-between">
        <div className="my-auto">
          <CardTitle>
            <Skeleton className="h-6 w-[250px] my-1" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-[200px] my-1" />
          </CardDescription>
        </div>
        <div className="mt-0">
          <Skeleton className="h-12 w-12 rounded-full my-1" />
        </div>
      </CardHeader>
      <CardContent>
        <p>
          <Skeleton className="h-4 w-[67vh] my-1" />
          <Skeleton className="h-4 w-[67vh] my-1" />
          <Skeleton className="h-4 w-[67vh] my-1" />
        </p>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-2 w-[200px]" />
      </CardFooter>
    </Card>
  );
}
