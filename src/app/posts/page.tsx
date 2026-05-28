"use client";

import { useEffect, useState } from "react";

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- 13강: any의 한계와 다음 단계의 명시적 타입을 비교합니다.
  const [posts, setPosts] = useState<{ [key: string]: any }[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <h1>글 목록</h1>

      {posts.length == 0 && <div>로딩중...</div>}

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}
