type Todo = {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
};

type Props = {
  data: Todo[];
  deleteHandler: (id: string) => void;
  stateHandler: (id: string, isDone: boolean) => void;
};

const TodoBox = ({ data, deleteHandler, stateHandler }: Props) => {
  return (
    <>
      {data.map((todo) => (
        <div key={todo.id} className="mb-4 p-4 rounded shadow-lg bg-gray-300">
          <div className="font-bold text-lg mb-2">제목 : {todo.title}</div>
          <p className=" text-base mb-4">내용 : {todo.contents}</p>
          <div className="flex justify-start space-x-4">
            <button
              onClick={() => deleteHandler(todo.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              삭제
            </button>
            <button
              onClick={() => stateHandler(todo.id, todo.isDone)}
              className={`${
                todo.isDone
                  ? "bg-blue-500 hover:bg-blue-700"
                  : "bg-green-500 hover:bg-green-700"
              } text-white font-bold py-2 px-4 rounded`}
            >
              {todo.isDone ? "취소" : "완료"}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoBox;
