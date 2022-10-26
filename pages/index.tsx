import { useState } from "react";
import type { GetServerSideProps } from "next";
import { prisma } from "../lib/prisma";

interface Notes {
  notes: {
    id: string;
    title: string;
    content: string;
  }[];
}

interface FormData {
  title: string;
  content: string;
  id: string;
}

const Home = ({ notes }: Notes) => {
  const [form, setForm] = useState<FormData>({
    title: "",
    content: "",
    id: "",
  });

  async function create(data: FormData) {
    try {
      fetch("http://localhost:3001/api/create", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => setForm({ title: "", content: "", id: "" }));
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (data: FormData) => {
    try {
      create(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="mt-4 text-center text-2xl font-bold">Notes</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
        className="mx-auto flex w-auto min-w-[25%] max-w-min flex-col items-stretch space-y-6"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded border-2 border-gray-600 p-1"
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="rounded border-2 border-gray-600 p-1"
        />
        <button type="submit" className="rounded bg-blue-500 p-1 text-white">
          Add +
        </button>
      </form>
      <div className="mx-auto mt-20 flex w-auto min-w-[25%] max-w-min flex-col items-stretch space-y-6">
        <ul>
          {notes.map((note) => (
            <li key={note.id} className="border-b border-gray-600 p-2">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="font-bold">{note.title}</h3>
                  <p className="text-sm">{note.content}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const notes = await prisma.note.findMany({
    select: {
      title: true,
      id: true,
      content: true,
    },
  });

  return {
    props: {
      notes,
    },
  };
};
