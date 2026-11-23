# 스프링부트와 Next.js REST API 연동

수업: https://www.slog.gg/p/14175

Node.js 26.13.1 LTS, pnpm 12.21.0을 사용합니다.

## 실행 방법 (내 Mac)

프론트와 백엔드를 **터미널 2개**에서 동시에 켜 둡니다. VS Code에서 `` Ctrl + ` ``로 터미널을 열고, 터미널 패널의 **+**로 하나 더 엽니다.

| 터미널 | 폴더 | 명령 | 주소 |
|---|---|---|---|
| 1 | `~/projects/p-14175-2-lecture` (프론트) | `pnpm dev` | http://localhost:3000 |
| 2 | `~/projects/p-14172-2` (백엔드) | `./gradlew bootRun` | http://localhost:8080 |

### 터미널 1: 프론트 (Next.js)

```bash
cd ~/projects/p-14175-2-lecture
pnpm install --frozen-lockfile
pnpm dev
```

### 터미널 2: 백엔드 (Spring Boot)

```bash
cd ~/projects/p-14172-2
./gradlew bootRun
```

로그에 `Started ... Application`이 나오면 준비된 것입니다. Java 25가 필요합니다.

### 강의 태그로 이동

```bash
git checkout 015-1   # 원하는 강의 태그
pnpm install --frozen-lockfile
pnpm dev
```

- 실행 중인 서버는 `Ctrl + C`로 멈춥니다.
- `Failed to fetch` 오류가 나면 백엔드(터미널 2)가 꺼져 있는 것입니다.
- 이론 강의(예: 14강)는 태그가 없으니 바로 앞 태그(`013-5`)를 봅니다.

## 브랜치 구성

이 저장소에는 프론트와 백엔드가 **브랜치로 나뉘어** 들어 있습니다.

| 브랜치 | 내용 | 강의 원본 | 태그 |
|---|---|---|---|
| `main` | 프론트엔드 (Next.js) | [jhs512/p-14175-3](https://github.com/jhs512/p-14175-3) | `001` ~ `051` |
| `backend` | 백엔드 (Spring Boot, Java 25) | [jhs512/p-14172-2](https://github.com/jhs512/p-14172-2) | `backend-001` ~ `backend-071-7` |

두 원본 저장소의 태그 이름이 겹쳐서, 백엔드 태그에는 앞에 `backend-`를 붙였습니다. 수업에서 쓰는 백엔드 버전은 `backend-068`입니다.

### 백엔드만 따로 받기

```bash
cd ~/projects
git clone --branch backend-068 https://github.com/zoek1211/spring-nextjs-rest.git p-14172-2
cd p-14172-2
./gradlew bootRun
```

### 로컬 폴더와 원격 연결

| 폴더 | `origin` (내 저장소) | `upstream` (강의 원본) |
|---|---|---|
| `p-14175-2-lecture` | `zoek1211/spring-nextjs-rest` → `main` | `jhs512/p-14175-3` |
| `p-14172-2` | `zoek1211/spring-nextjs-rest` → `backend` | `jhs512/p-14172-2` |

강의 원본이 업데이트되면 각 폴더에서 `git fetch upstream --tags`로 받습니다.

## 강의 코드 보기와 내 코드 올리기

강의 코드는 **태그**로 보고, 내 코드는 **내 브랜치**에 올립니다.

### 1. 강의 코드 보기 (태그 체크아웃)

```bash
git checkout 015-1
pnpm install --frozen-lockfile
pnpm dev
```

VS Code: 왼쪽 아래 브랜치 이름 클릭 → 태그 선택.

- 태그는 **보기 전용**입니다. 여기서 고치고 커밋해도 어느 브랜치에도 남지 않습니다.
- 다른 태그로 옮기기 전에 수정한 내용은 버립니다: `git restore .` (VS Code: Source Control → **Discard Changes**)

### 2. 내 코드 올리기 (내 브랜치)

시작할 강의 태그에서 내 브랜치를 만듭니다 (처음 한 번).

```bash
git switch -c my-front 015-1
```

코드를 수정한 뒤 커밋하고 push합니다.

```bash
git add .
git commit -m "15강 따라 치기"
git push -u origin my-front   # 처음 한 번만 -u origin my-front, 이후에는 git push
```

VS Code: Source Control(`Ctrl + Shift + G`) → 메시지 입력 → **✓ Commit** → **Sync Changes** / **Publish Branch**.

다음에 이어서 작업할 때는 내 브랜치로 돌아옵니다.

```bash
git switch my-front
```

### 정리

| 하고 싶은 것 | 명령 |
|---|---|
| 강의 코드 보기 | `git checkout 015-1` |
| 내 브랜치로 돌아오기 | `git switch my-front` |
| 내 코드 저장 | `git add .` → `git commit -m "..."` |
| GitHub에 올리기 | `git push` |

백엔드 폴더(`p-14172-2`)도 같은 방법입니다. 로컬 태그 이름은 `068`처럼 그대로 쓰고, 같은 GitHub 저장소를 쓰므로 브랜치 이름은 `my-back`처럼 겹치지 않게 짓습니다.

## 강의 원본 안내

```powershell
npm install -g pnpm@12.21.0
git clone https://github.com/jhs512/p-14175-3.git
cd p-14175-3
git checkout 001
pnpm install --frozen-lockfile
pnpm dev
```

강의 태그로 이동한 다음 항상 `pnpm install --frozen-lockfile`을 실행하세요. 최신 강의는 `051`입니다. 개발 서버는 http://localhost:3000 입니다.

백엔드는 https://github.com/jhs512/p-14172-2 의 `068` 태그를 Java 25로 실행합니다.
개발 DB: `jdbc:h2:./db_dev`, 테스트 DB: `jdbc:h2:mem:db_test`. API: http://localhost:8080.

검사: `pnpm lint --max-warnings 0`, `pnpm typecheck`, `pnpm build`.

Next.js 16의 최신 기본 구성인 Cache Components(`cacheComponents: true`)와 Partial Prefetching(`partialPrefetching: true`)을 켭니다. Tailwind CSS는 `postcss.config.mjs` 대신 `@tailwindcss/turbopack` 로더로 연결합니다. `useParams()`를 쓰는 `src/app/posts/[id]` 경로에는 016부터 `loading.tsx`를 두어 Suspense 경계를 만듭니다. 레이아웃은 Next.js가 생성하는 `LayoutProps<"/">` 타입을 사용하며, `pnpm typecheck`는 `next typegen`으로 route 타입을 만든 뒤 검사합니다.

TypeScript 7.0.2 네이티브 컴파일러는 `@typescript/native` alias로 설치하고, Next.js와 ESLint가 사용하는 compiler API는 `typescript` 이름에 연결한 `@typescript/typescript6@6.0.2`가 제공합니다. `pnpm typecheck`는 TypeScript 7을 사용합니다.
ESLint 10은 eslint-plugin-import/jsx-a11y/react의 peer 범위를 벗어나므로 9.39.5를 사용합니다.
설치 스크립트는 `pnpm-workspace.yaml`에서 sharp와 unrs-resolver에 대해 실행하지 않도록 명시했습니다. Windows용 사전 빌드 바이너리로 설치와 빌드를 검증합니다.

공식 근거: [Next.js](https://nextjs.org/docs/app/getting-started/installation), [TypeScript alias](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/), [pnpm 설정](https://pnpm.io/settings).
