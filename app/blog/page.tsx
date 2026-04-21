"use client";
import Link from "next/link";
export default function Page() {
  return (
    <div style={{padding:"40px",fontFamily:"sans-serif"}}>
      <h1 style={{fontSize:"32px",fontWeight:"900",marginBottom:"16px"}}>blog</h1>
      <p style={{color:"#666",marginBottom:"24px"}}>Coming soon — full content loading.</p>
      <Link href="/" style={{color:"#00A896",fontWeight:"600"}}>Back to Home</Link>
    </div>
  );
}
