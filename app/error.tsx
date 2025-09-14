"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
    const router = useRouter()
    return ( 
        <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
            <p>Something went wrong</p>
            <Button onClick={() => router.refresh()} variant={"secondary"} asChild>
                    Go back home
            </Button>
        </div>
     );
}
 
export default ErrorPage;