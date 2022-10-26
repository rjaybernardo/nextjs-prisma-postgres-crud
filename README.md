$ npx create-next-app@latest --ts
install tailwindcss
install tailwindcss plugin
add prisma - npm i prisma --save-dev
$ npx prisma init

- postgres

Go to prisma docs - prisma.io
$ npx prisma notes push

Create a note form page - index.tsx
Create note function - api/create.ts

import { prisma } from "../lib/prisma"; -> gives access to prisma
geServerSideProps - gives access to notes
