import { useState } from "react";

export function useSlider(length: number) {
  const [current, setCurrent] = useState(0);

  const next = () =>
    setCurrent((p) => (p === length - 1 ? 0 : p + 1));

  const prev = () =>
    setCurrent((p) => (p === 0 ? length - 1 : p - 1));

  return { current, next, prev };
}