"use client";

import { useEffect, useState } from "react";

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- 13강: any의 한계와 다음 단계의 명시적 타입을 비교합니다.
  const [posts, setPosts] = useState<{ [key: string]: any }[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setPosts([
      { id: 1, title: "명언 1" },
      { id: 2, title: "명언 2" },
      { id: 3, title: "명언 3" },
    ]), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <h1>글 목록</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}
