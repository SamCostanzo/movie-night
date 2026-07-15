"use server";

import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

// CREATE LIST
export async function createList(formData: FormData) {
  // 1. Who's logged in?
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("Not logged in");
  }

  // 2. Get the list name from the form
  const name = formData.get("name") as string;
  if (!name?.trim()) return;

  // 3. Create the list, owned by this user
  await prisma.list.create({
    data: {
      name: name.trim(),
      ownerId: session.user.id,
    },
  });

  // 4. Refresh the page so the new list shows
  revalidatePath("/lists");
}

// ADD MOVIE TO LIST
export async function addMovieToList(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("Not logged in");
  }

  const listId = formData.get("listId") as string;
  const movieId = Number(formData.get("movieId"));

  if (!listId || !movieId) return;

  // Security: verify this list belongs to the logged-in user
  const list = await prisma.list.findUnique({
    where: { id: listId },
  });
  if (!list || list.ownerId !== session.user.id) {
    throw new Error("Not your list");
  }

  // Add the movie to the list
  await prisma.listItem.create({
    data: {
      listId: listId,
      movieId: movieId,
    },
  });

  revalidatePath(`/movie/${movieId}`);
}
