"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { COOKIE_NAME, type Locale } from "./config";

export async function setLocale(locale: Locale) {
  const store = await cookies();
  store.set(COOKIE_NAME, locale);
  revalidatePath("/");
}
