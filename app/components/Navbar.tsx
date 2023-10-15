import Link from 'next/link';
import React from 'react'

const Navbar = () => {
  return (
    <div className="p-2 w-full flex gap-3">
      <div>
        <Link href="/">Home</Link>
      </div>
      <Link href="/text-with-marker">Text with marker</Link>
      <Link href="/marker-with-popup">Marker with Popup</Link>
    </div>
  );
}

export default Navbar;