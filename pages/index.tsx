import { useState } from "react";
import type { NextPage } from "next";

interface FormData {
  title: string;
  content: string;
  id: string;
}

const Home: NextPage = () => {
  const [form, setForm] = useState<FormData>({
    title: "",
    content: "",
    id: "",
  });

  return (
    <div>
      <h1 className="mt-4 text-center text-2xl font-bold">Notes</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
    </div>
  );
};
export default Home;
