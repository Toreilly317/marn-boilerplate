import React from 'react';
import Link from 'next/link';

const MenuItem = ({ href, text, icon }) => (
  <li>
    <Link href={href}>
      <a>
        <span>{text}</span> <div>{icon}</div>
      </a>
    </Link>
  </li>
);

export default MenuItem;
