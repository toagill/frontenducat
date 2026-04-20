"use client";
export const motion = {
  div: ({ children, className, style, initial, animate, exit, transition, ...props }: any) => (
    <div className={className} style={style} {...props}>{children}</div>
  ),
  span: ({ children, className, style, ...props }: any) => (
    <span className={className} style={style} {...props}>{children}</span>
  ),
  li: ({ children, className, style, ...props }: any) => (
    <li className={className} style={style} {...props}>{children}</li>
  ),
};
export const AnimatePresence = ({ children }: any) => <>{children}</>;
export default motion;
