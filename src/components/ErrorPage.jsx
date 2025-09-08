// src/components/ErrorPage.jsx
import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-red-600">🚫 Page Not Found</h1>
      <p className="mt-4">{error.statusText || error.message}</p>
    </div>
  );
}

export default ErrorPage;
