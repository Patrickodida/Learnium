import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Learn. Build. Grow.
            </h1>
            <p className="mt-4 text-lg text-blue-100">
              Access carefully curated free and premium courses to level up your
              skills.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                to="/courses"
                className="bg-white text-blue-700 font-semibold px-6 py-3 rounded hover:bg-blue-50"
              >
                Browse Courses
              </Link>
              <Link
                to="/signup"
                className="border border-white/70 font-semibold px-6 py-3 rounded hover:bg-white hover:text-blue-700"
              >
                Get Started
              </Link>
            </div>
          </div>
          <img
            src="/logo.png"
            alt="illustration"
            className="w-52 md:justify-self-end md:w-64 opacity-90"
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">Why Learnium?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg bg-white">
            <h3 className="font-semibold">Learn at your pace</h3>
            <p className="text-sm text-gray-600 mt-2">
              Bite-sized lessons you can watch anytime.
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-white">
            <h3 className="font-semibold">Free & Premium</h3>
            <p className="text-sm text-gray-600 mt-2">
              Start free, go premium when you need more depth.
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-white">
            <h3 className="font-semibold">Track progress</h3>
            <p className="text-sm text-gray-600 mt-2">
              Mark lessons complete and keep your momentum.
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/courses"
            className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Explore Courses
          </Link>
        </div>
      </section>
    </>
  );
};
export default Home;
