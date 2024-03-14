export async function GET(request: Request) {
  const response = await fetch("http://localhost:4000/companyInfo");
  const companyInfo = await response.json();

  if (!companyInfo) {
    return new Response("companyInfo is not found", {
      status: 404,
    });
  }

  return Response.json({
    companyInfo: [
      ...companyInfo,
      {
        test: "test",
      },
    ],
  });
}

export async function PUT(request: Request) {
  try {
    const { name, description, image } = await request.json();
    const response = await fetch(`http://localhost:4000/companyInfo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, image }),
    });

    if (!response.ok) {
      return new Response("해당 정보를 업데이트 하는데 실패했습니다", {
        status: 404,
      });
    }
    const updatedcompanyInfo = await response.json();

    return new Response(JSON.stringify({ updatedcompanyInfo }), {
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
