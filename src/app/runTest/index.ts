import { ITest } from "../test";

export default async (test: ITest) => {
  const res = await fetch("/api/test/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(test)
  });
  if (!res.ok) {
    return false;
  }

  const result = await res.json();

  if (result.ok) {
    return true;
  }

  return false;
};
