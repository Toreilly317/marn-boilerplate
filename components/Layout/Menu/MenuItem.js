import React from 'react'
import Link from 'next/link'

const MenuItem = ({ href, text }) => (
  <li className="menu-item">
    <Link href={href}>
      <div>{text}</div>
    </Link>
  </li>
)

export default MenuItem
