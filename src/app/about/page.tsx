const page = async () => {
  const response = await fetch(`http://localhost:4000/companyInfo`);
  if (!response.ok) {
    throw new Error("데이터를 불러올 수 없습니다!");
  }
  //컴퍼니 정보 가져오기
  const companyInfo = await response.json();
  return (
    <div className="flex flex-col items-center w-full h-screen bg-white text-black">
      <div className="m-100">gd</div>
      <div className="border-b w-1/2 items-center flex flex-col justify-items-center text-red-500">
        <span className="m-5">{companyInfo.name}</span>
      </div>
      <div className="m-5 w-1/2">
        <p>{companyInfo.description}</p>
      </div>
    </div>
  );
};

export default page;
