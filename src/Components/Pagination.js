import React from "react";

export default function Pagination(props) {
    const { postsPerPage, totalPosts, paginate, }=props
  const pageNumbers = [];
  for (let i = 1; i<=Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => {paginate(number)}} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
