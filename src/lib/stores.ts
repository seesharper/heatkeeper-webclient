import { writable } from "svelte/store";
import type { User } from "./models";

export const alert = writable("Welcome to the to-do list app!");
export const currentUser = writable<User>();
const STUDENTS = [
    { name: "john", surname: "doe", age: 17 },
    { name: "micheal", surname: "angelo", age: 21 },
  ];
  
const { subscribe, set, update } = writable(STUDENTS);