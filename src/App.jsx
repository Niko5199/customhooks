import React, { useEffect, useState } from "react";

const statuses = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILURE: "failure",
};

function useAsync(fn) {
  const [status, setStatus] = useState(statuses.PENDING);
  const [data, setData] = useState(null);
  useEffect(
    function runAsyncFunction() {
      setStatus(statuses.PENDING);
      fn()
        .then((result) => {
          setData(result);
          setStatus(statuses.SUCCESS);
        })
        .catch((error) => {
          setData(error);
          setStatus(status.FAILURE);
        });
    },
    [fn]
  );
  return { status, data };
}

export const App = () => {
  const { status, data } = useAsync(fn);
  console.log({ status, data });
  if (status === statuses.PENDING) return <p>Loading...</p>;
  if (status === statuses.SUCCESS) return <p>Sucesss</p>;
  if (status === statuses.FAILURE) return <p>Failure</p>;
  return <div>Implement me</div>;
};

async function fn() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(null), 2000);
  });
}
