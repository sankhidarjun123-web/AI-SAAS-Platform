import { Link } from "react-router-dom";
import React from "react";

interface ClickableProps {
  posLeft?: number | "auto";
  posTop?: number | "auto";
  posBottom?: number | "auto";
  posRight?: number | "auto";
  size?: number;
  children: React.ReactNode;
  path?: string;
  classAdd?: string;
  onClick?: (event: unknown) => void;
}

export const Clickable: React.FC<ClickableProps> = ({
  path,
  children,
  classAdd = "bg-white",
  size = 40,
  posLeft = "auto",
  posTop = "auto",
  posBottom = "auto",
  posRight = "auto",
  onClick,
}) => {
  const className = `
    fixed z-50
    flex items-center justify-center
    rounded-full
    shadow-lg
    border border-gray-200
    transition-all duration-200
    hover:scale-110
    hover:shadow-xl
    active:scale-95
    ${classAdd}
  `;

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    left: posLeft === "auto" ? "auto" : `${posLeft}px`,
    top: posTop === "auto" ? "auto" : `${posTop}px`,
    bottom: posBottom === "auto" ? "auto" : `${posBottom}px`,
    right: posRight === "auto" ? "auto" : `${posRight}px`,
  };

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={className}
        style={style}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      to={path ?? "#"}
      className={className}
      style={style}
    >
      {children}
    </Link>
  );
};