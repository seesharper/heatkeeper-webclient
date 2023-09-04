import { writable } from "svelte/store";
import type { User } from "./models";

export const alert = writable("Welcome to the to-do list app!");
export const currentUser = writable<User>();
