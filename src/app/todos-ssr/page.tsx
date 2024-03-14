import Link from "next/link";
import React from "react";

type Todo = {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
};
const Page = async () => {
  const response = await fetch(`http://localhost:4000/todos`, {
    cache: "no-cache",
  });

  const todos: Todo[] = await response.json();

  return (
    <>
      <div className="w-full h-screen bg-white flex flex-col items-center justify-start p-4 text-black">
        <Link
          href="/report"
          className="bg-ivory-500 hover:bg-red-700 w-36 border border-black rounded-md m-5"
        >
          할일정보통계보러가기
        </Link>
        <div className="flex">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="mb-4 p-4 rounded shadow-lg bg-gray-300"
            >
              <div className="font-bold text-lg mb-2">제목 : {todo.title}</div>
              <p className=" text-base mb-4">내용 : {todo.contents}</p>
              <div className="flex justify-start space-x-4">
                <button
                  className={`
                  w-48
                  ${
                    todo.isDone
                      ? "bg-blue-500 hover:bg-blue-700"
                      : "bg-green-500 hover:bg-green-700"
                  } text-white font-bold py-2 px-4 rounded`}
                >
                  {todo.isDone ? "할일" : "완료"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
