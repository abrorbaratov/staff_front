import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // fail dan keyin necha marta urinishni belgilaydi
      cacheTime: 300_000, //ishlatilmayotgan ma'lumotlar necha ms dan keyin o'chirib yuborilsin
      staleTime: 10 * 1000, // har necha sekundda ma'lumot yangilansin
      refetchOnWindowFocus: true, // boshqa tabga o'tib qaytilganda ma'lumot yangilanishi
      refetchOnReconnect: true, // uzilishdan keyin
      refetchOnMount: true, // Ma'lumot berishda, avval kesh ma'lumotlarni berib, backend dan ma'lumot qaytganidan so'ng komponentani rerender qilish
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
