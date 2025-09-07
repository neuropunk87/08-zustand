import axios from "axios";
import type { Note, Tag, NewNoteData } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api/";
axios.defaults.headers["Authorization"] =
  `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

type SortBy = "created" | "updated";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string,
  page: number = 1,
  perPage: number = 12,
  tag?: Exclude<Tag, "All">,
  sortBy?: SortBy
) => {
  const { data } = await axios<FetchNotesResponse>("notes", {
    params: {
      search,
      page,
      perPage,
      tag,
      sortBy,
    },
  });
  return data;
};

export const createNote = async ({ title, content, tag }: NewNoteData) => {
  const { data } = await axios.post<Note>("notes", {
    title,
    content,
    tag,
  });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await axios.get<Note>(`notes/${id}`);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await axios.delete<Note>(`notes/${id}`);
  return data;
};
