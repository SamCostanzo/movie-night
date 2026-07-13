import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createList } from "@/app/lib/actions";
import Container from "../components/Container";


export default async function ListsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Protect the route
  if (!session) {
    redirect("/login");
  }

  return (
    <Container>
        <h1 className="font-display text-3xl mb-6 text-center">My Lists</h1>
        <p className="text-center">Welcome, {session.user.name}. Your lists will appear here.</p>
        <form action={createList} className="flex flex-col w-full max-w-md mx-auto gap-2 mb-8">
            <input name="name" placeholder="New list name" required className="border-2 border-ink rounded px-3 py-2" />
            <button type="submit" className="bg-brand text-background rounded-full px-4 py-2 max-w-fit cursor-pointer uppercase">Create</button>
        </form>
    </Container>
  );
}