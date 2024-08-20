"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  container?: Element | DocumentFragment;
  key?: null | string;
}

export const Portal: React.FC<Props> = (props) => {
  const { children, container, key } = props;
  const [targetContainer, setTargetContainer] = useState<Element | DocumentFragment | null>(container || null);

  useEffect(() => {
    if (!container) {
      setTargetContainer(document.body);
    }
  }, [container]);

  if (!targetContainer) {
    return null;
  }

  return createPortal(children, targetContainer, key);
};