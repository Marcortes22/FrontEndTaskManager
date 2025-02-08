import { useState } from 'react';

export default function useDespegableTaskList(defaulOpenValue?: boolean) {
  const [open, setOpen] = useState(defaulOpenValue ?? false);

  function handleOpen() {
    setOpen((prev) => !prev);
  }

  return { open, handleOpen };
}
