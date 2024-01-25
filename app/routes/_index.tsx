import { defer, type MetaFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
   // 👇 note this promise is not awaited
   const reviewsPromise = new Promise<number>((r => {
    setTimeout(() => {
      // fetch('http://localhost:8080/123')
      r(100);
    }, 5000)
   }))
   // 👇 but this one is
   const product = await new Promise<number>((r => {
    setTimeout(() => {
      // fetch('http://localhost:8080/1234')
      r(101);
    }, 2000)
   }))

   console.log('loader',loader)
 
   return defer({
     product,
     reviews: reviewsPromise,
   });
}

export default function Index() {
  const { product, reviews } =
  useLoaderData<typeof loader>();

  console.log('product',product,reviews)
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div>{product}</div>
      <Suspense fallback={<div>12314</div>}>
        <Await resolve={reviews}>
          {(reviews) => <div>{reviews}</div>}
        </Await>
      </Suspense>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
