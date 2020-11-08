import React, { ReactNode } from "react";

export function RenderArrayData<T>({
  data,
  error,
  children,
}: {
  data: T[];
  error: any;
  children: ReactNode;
}) {
  return data ? (
    data.length !== 0 ? (
      children
    ) : null
  ) : error ? (
    <h2>Ошибка</h2>
  ) : (
    <h2>Загрузка...</h2>
  );
}

export default RenderArrayData;
