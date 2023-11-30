import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import "./index.css"
import AboutPage from "./pages/about/index.tsx"
import { ROUTE_PATH } from "./constant/route.ts"
import NotFoundPage from "./error/NotFound.tsx"

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      suspense: true,
    },
  },
})

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.HOME,
    element: <App />,
  },
  {
    path: ROUTE_PATH.ABOUT,
    element: <AboutPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* 아래는 react query dev tool입니다. https://tanstack.com/query/latest/docs/react/devtools */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </React.StrictMode>,
)
