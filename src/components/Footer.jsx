import React from "react";

const Footer = () => {
  return (
    <footer className="border-t bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Learnium. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/courses">Courses</a>
          <a href="/">Home</a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
