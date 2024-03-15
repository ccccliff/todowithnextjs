"use client";

import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import TodoBox from "../../components/TodoBox";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
type Todo = {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
};

const Page = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>("");
  const [contents, setcontents] = useState<string>("");

  const SERVER_URI = "http://localhost:4000";
  // 모든 todos를 가져오는 api
  const getTodos = async (): Promise<Todo[]> => {
    const response = await axios.get(`${SERVER_URI}/todos`);
    return response.data;
  };
  const addTodo = async (newTodo: Todo) => {
    await axios.post(`${SERVER_URI}/todos`, newTodo);
  };
  const deleteTodo = async (id: string) => {
    await axios.delete(`${SERVER_URI}/todos/${id}`);
  };
  const toggleTodo = async ({
    id,
    isDone,
  }: {
    id: string;
    isDone: boolean;
  }) => {
    await axios.patch(`${SERVER_URI}/todos/${id}`, {
      isDone: !isDone,
    });
  };

  const onTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const oncontentsHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setcontents(e.target.value);
  };
  const { isPending, isError, data } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
  //입력 핸들러
  const todoHandler = () => {
    if (!title.trim() || !contents.trim()) {
      toast.error("제목과 내용 모두 입력하세요");
    } else {
      const newTodo = {
        id: `${new Date().getTime()}`,
        title: title,
        contents: contents,
        isDone: false,
      };
      addMutation.mutate(newTodo);
      setTitle("");
      setcontents("");
    }
  };
  // 삭제 핸들러
  const deleteHandler = (id: string) => {
    deleteMutation.mutate(id);
  };
  //토글핸들러
  const stateHandler = (id: string, isDone: boolean) => {
    toggleMutation.mutate({ id, isDone });
  };
  //페이지 이동 핸들러
  const pageHandler = () => {
    router.push("/report");
  };

  if (isPending) {
    return <p>로딩중입니다....!</p>;
  }

  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  return (
    <>
      <div className="w-full h-1/3 bg-white flex flex-col items-center justify-start p-4 text-black">
        <div className="text-4xl">TodoList</div>
        <button
          onClick={pageHandler}
          className="bg-ivory-500 hover:bg-red-700 w-48 border border-black rounded-md m-5"
        >
          할일정보통계보러가기
        </button>
        <div>
          제목:
          <input
            className="w-48 h-20 border border-black rounded-md m-5"
            maxLength={10}
            placeholder="제목을 입력하세요, 10자 미만"
            value={title}
            onChange={onTitleHandler}
          />
          내용:
          <input
            className="w-[500px] h-20 border border-black rounded-md m-5"
            maxLength={30}
            placeholder="내용을 입력하세요, 30자 미만"
            value={contents}
            onChange={oncontentsHandler}
          />
          <button
            className="bg-gray-500 hover:bg-red-700 w-12 rounded-md"
            onClick={todoHandler}
          >
            작성
          </button>
        </div>
      </div>
      <div className="h-2/3 bg-white p-5 text-black">
        working
        <div className="w-full h-50 flex items-center justify-start mt-5 p-5">
          <TodoBox
            data={data?.filter((data) => !data.isDone) ?? []}
            deleteHandler={deleteHandler}
            stateHandler={stateHandler}
          />
        </div>
        done
        <div className="w-full h-50 flex items-center justify-start mt-5 p-5">
          <TodoBox
            data={data?.filter((data) => data.isDone) ?? []}
            deleteHandler={deleteHandler}
            stateHandler={stateHandler}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
