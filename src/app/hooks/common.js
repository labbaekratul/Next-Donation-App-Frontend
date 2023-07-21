import { useState } from "react";

const useSubmitItemHandler = () => {
  const [saving, setSaving] = useState(false);

  const submitItemHandler = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 2000);
  };

  return { saving, submitItemHandler };
};

export default useSubmitItemHandler;
