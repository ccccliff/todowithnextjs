export async function GET(request: Request) {
  const response = await fetch("http://localhost:4000/todos");
  const todos = await response.json();

  if (!todos) {
    return new Response("Todo is not found", {
      status: 404,
    });
  }

  return Response.json({
    todos: [
      ...todos,
      {
        title: "title",
        contents: "contents",
        isDone: "isDone",
      },
    ],
  });
}

export async function POST(request: Request) {
  // body에서 값을 뽑아오기
  const { title, contents } = await request.json();

  const response = await fetch("http://localhost:4000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ title, contents, isDone: false }),
  });

  const todo = await response.json();

  return Response.json({
    todo,
  });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return new Response("해당 Todo를 삭제하는데 실패했습니다", {
        status: 404,
      });
    }

    return new Response("해당 Todo를 삭제했습니다", {
      status: 200,
    });
  } catch (error) {
    return new Response("오류가 발생했습니다", {
      status: 500,
    });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, contents, isDone } = await request.json();
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, contents, isDone }),
    });

    if (!response.ok) {
      return new Response("해당 Todo를 업데이트 하는데 실패했습니다", {
        status: 404,
      });
    }
    const updatedTodo = await response.json();

    return new Response(JSON.stringify({ updatedTodo }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("오류가 발생했습니다", {
      status: 500,
    });
  }
}
