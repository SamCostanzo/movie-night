import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createList } from "@/app/lib/actions";
import { prisma } from "@/app/lib/prisma";
import Container from "../components/Container";
import Link from "next/link";

export default async function ListsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }

  // Fetch THIS users lists!
  const lists = await prisma.list.findMany({
    where: { ownerId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Container>
      <h1 className="font-display text-3xl mb-6 text-center">My Lists</h1>
      <p className="text-center">Welcome, {session.user.name}. Your lists will appear here.</p>
      <form action={createList} className="flex flex-col w-full max-w-md mx-auto gap-2 mb-8">
        <input name="name" placeholder="New list name" required className="border-2 border-ink rounded px-3 py-2" />
        <button type="submit" className="bg-brand text-background rounded-full px-4 py-2 max-w-fit cursor-pointer uppercase">
          Create
        </button>
      </form>
      <div className="flex flex-col gap-3">
        {lists.length === 0 ? (
          <p className="text-muted">No lists yet. Create one above!</p>
        ) : (
          lists.map((list) => (
            <Link key={list.id} href={`/lists/${list.id}`}>
              <div key={list.id} className="border-2 border-ink rounded p-4">
                <h2 className="font-display text-xl">{list.name}</h2>
              </div>
            </Link>
          ))
        )}
      </div>
    </Container>
  );
}
