import { useState } from 'react';

export default function useDespegableTaskList() {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen((prev) => !prev);
  }

  return { open, handleOpen };
}
