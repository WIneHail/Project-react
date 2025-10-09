import { z } from "zod";
import { fetchResValid } from "./FetchResValid";

const User = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  password: z.string(),
  favorites: z.string().array()
})

const UserAuthSchema = User.omit({ name: true, surname: true, favorites: true })

type UserAuth = z.infer<typeof UserAuthSchema>

const UserRegisterSchema = User.omit({ favorites: true })

export const ResFetchMeSchema = User.omit({ password: true })

type UserRegister = z.infer<typeof UserRegisterSchema>

export type ResFetchMe = z.infer<typeof ResFetchMeSchema>

export function fetchProfile(): Promise<ResFetchMe> {
  return fetch('https://cinemaguide.skillbox.cc/profile', {
    method: 'GET',
    credentials: "include",
  }
  )
    .then(fetchResValid)
    .then(res => res.json())
    .then(data => ResFetchMeSchema.parse(data))
}

export const login = ({ email, password }: UserAuth): Promise<void> => {
  return fetch('https://cinemaguide.skillbox.cc/auth/login', {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(fetchResValid)
    .then(() => undefined)
}

export function logOut(): Promise<void> {
  return fetch('https://cinemaguide.skillbox.cc/auth/logout', {
    method: 'GET',
    credentials: "include",
  })
    .then(fetchResValid)
    .then(() => undefined)
}

export const registration = ({ name, surname, email, password }: UserRegister): Promise<void> => {
  return fetch('https://cinemaguide.skillbox.cc/user', {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, surname, email, password })
  })
    .then(fetchResValid)
    .then(() => undefined)
}
