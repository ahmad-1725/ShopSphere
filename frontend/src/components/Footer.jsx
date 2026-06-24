import React from "react";
import '../index.css';

const Footer = () => {
  return (
    <footer className="px-24 py-10 border">
      <div className="flex justify-between">
        <h1 className="text-2xl first-line:font-normal font-[serif] italic text-[#0C0C10]">
          Digi<span className="text-[--gold] ">Store</span>
        </h1>{" "}
        <p className="text-[--muted] text-sm font-light">
          © 2026 Digi Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
