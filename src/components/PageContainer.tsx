import React from "react";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Global page wrapper that enforces the standard 16px horizontal padding
 * and fills the available height. Use this as the root of every screen's
 * scrollable content area (not the fixed header/footer).
 */
export function PageContainer({ children, className = "", style }: PageContainerProps) {
  return (
    <div
      className={className}
      style={{
        paddingLeft: "var(--page-horizontal-padding)",
        paddingRight: "var(--page-horizontal-padding)",
        width: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
