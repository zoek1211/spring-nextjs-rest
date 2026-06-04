# Windows 검증 결과 — 2026-11-23

수업: https://www.slog.gg/p/14175

## p-14175-2와 달라진 점

p-14175-2의 69개 강의 커밋을 같은 메시지, 순서, 태그로 다시 쌓으면서 모든 강의 스냅샷에 아래 변경을 넣었습니다. 최종 단계에 최신화 커밋 하나를 더하는 방식이 아닙니다. 원본 저장소는 수정하지 않았습니다.

- `pnpm create next-app@16.4.6 ... --cache-components` 템플릿과 같은 `next.config.ts`: `cacheComponents: true`, `partialPrefetching: true`, `reactCompiler: true`, Tailwind CSS용 `@tailwindcss/turbopack` 로더.
- `@tailwindcss/postcss`와 `postcss.config.mjs`를 빼고 `@tailwindcss/turbopack@4.3.5`를 사용합니다.
- `src/app/layout.tsx`는 `Readonly<{ children: React.ReactNode }>` 대신 Next.js가 생성하는 `LayoutProps<"/">` 타입을 사용합니다.
- 016부터 `src/app/posts/[id]/loading.tsx`를 둡니다. Cache Components에서는 클라이언트 컴포넌트가 `<Suspense>` 밖에서 `useParams()`를 읽으면 `Blocking Route` 오류가 나고 빌드가 실패합니다. `loading.tsx`가 `[id]`와 그 아래 `edit` 페이지를 Suspense로 감쌉니다.
- `pnpm typecheck`는 `next typegen && tsc --noEmit`입니다.
- 패키지 이름과 README의 저장소 주소를 p-14175-3으로 바꿨습니다.

그 밖의 소스 파일은 원본 각 태그와 바이트 단위로 같습니다.

## 환경

- Windows x64, Node.js 26.13.0, pnpm 12.21.0.
- Next.js / eslint-config-next 16.4.6, React / React DOM 19.3.1, Tailwind CSS / @tailwindcss/turbopack 4.3.5.
- TypeScript 7.0.2 native CLI + @typescript/typescript6 6.0.2 compiler API alias, ESLint 9.39.5.
- 모든 강의 태그에 같은 `pnpm-lock.yaml`을 포함합니다.

## 검증 범위

| 대상 | 검사 | 결과 |
| --- | --- | --- |
| 69개 전체 강의 태그 | `pnpm lint --max-warnings 0` | 69/69 통과 |
| 69개 전체 강의 태그 | `pnpm typecheck` (route 타입 생성 후 TypeScript 7 검사) | 69/69 통과 |
| 001, 015-1, 016, 028-1, 051 | `pnpm install --frozen-lockfile` 후 Next.js 16.4.6 Turbopack production build | 5/5 통과, `partialPrefetching` 경고 없음 |
| 051 | 개발 서버에서 `/`, `/posts`, `/posts/2`, `/posts/2/edit`, `/posts/write` 요청 | 모두 200, `useParams()` Suspense 오류 없음 |
| 051, `loading.tsx` 제거(대조 실험) | production build, 개발 서버 | 빌드 실패, 개발 서버 로그에 `useParams()` Suspense 오류. 원래 상태로 되돌림 |
| 강의 이력 | 원본과 같은 69개 메시지/순서/태그, 모든 태그가 main의 조상 | 통과 |

실제 백엔드(p-14172-2 `068`)와 연결한 브라우저 CRUD 검사는 이번에 다시 하지 않았습니다. API 호출 코드는 p-14175-2와 같습니다.

빌드는 p-14175-2와 같이 `RAYON_NUM_THREADS=2`, `NODE_OPTIONS=--max-old-space-size=2048`로 병렬도와 메모리를 제한해 실행했습니다.

## 공식 자료

- [Next.js 설치](https://nextjs.org/docs/app/getting-started/installation)
- [URL data in a Client Component outside of Suspense](https://nextjs.org/docs/messages/blocking-prerender-client-hook)
- [Partial Prefetching 도입](https://nextjs.org/docs/app/guides/adopting-partial-prefetching)
