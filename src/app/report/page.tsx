type Todo = {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
};
const page = async () => {
  const response = await fetch(`http://localhost:4000/todos`, {
    next: {
      revalidate: 10,
    },
  });
  if (!response.ok) {
    throw new Error("데이터를 불러올 수 없습니다!");
  }
  const todos: Todo[] = await response.json();
  const donetodos = todos.filter((i) => i.isDone == true);
  return (
    <div className="flex flex-col items-center w-full h-screen bg-white text-black">
      <div className="flex  justify-items-center items-center  m-5">
        현재까지 <p className="text-red-500 text-base mx-5 "> {todos.length}</p>
        개의 todolist가 작성되었습니다
      </div>
      <div className="flex border-t p-5">
        현재까지
        <p className="text-red-500 text-base mx-5 ">{donetodos.length}</p> 개의
        완료된 todo 리스트,
        <p className="text-red-500 text-base mx-5 ">
          {todos.length - donetodos.length}
        </p>
        개의 해야할 todo 리스트가 존재합니다.
      </div>
    </div>
  );
};

export default page;
