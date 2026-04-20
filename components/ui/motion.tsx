// Stub motion component — replaces framer-motion dependency
export const motion = {
  div: ({ children, className, style, ...props }: any) => (
    <div className={className} style={style}>{children}</div>
  ),
  span: ({ children, className, style, ...props }: any) => (
    <span className={className} style={style}>{children}</span>
  ),
};
export const AnimatePresence = ({ children }: any) => <>{children}</>;
