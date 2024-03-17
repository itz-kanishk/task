import React from "react";

const BlogList = ({ blogs }) => {
  console.log(blogs);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {blogs.map((blog) => (
        <div key={blog._id} className="border p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
          <p>{blog.content}</p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => {
              console.log(blog._id);
              fetch(`https://blog-1-ki7f.onrender.com/blogs/${blog._id}`, {
                method: "DELETE",
              });
              window.location.reload();
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default BlogList;