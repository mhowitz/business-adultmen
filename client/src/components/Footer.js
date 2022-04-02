import React from 'react'

const Footer = () => {
  return (
    <footer className='width-100'>
    <div className="d-flex flex-column text-center">
      <ul className='noBullets'>
        <li>
          <a href='https://github.com/JasonWisniewski'>
          Jason Wisniewski
          </a>
        </li>
        <li>
          <a href='https://github.com/mhowitz'>
          Mikayla Howitz
          </a>
        </li>
        <li>
          <a href='https://github.com/davidtait1996'>
          David Tait
          </a>
        </li>
        <li>
          <a href='https://github.com/sabrielg'>
          Sabriel Gee
          </a>
        </li>
      </ul>
      <div>
      &copy; 2022 Adult Businessmen, llc
      </div>
    </div>
    </footer>
  )
}

export default Footer