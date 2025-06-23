# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



import React from 'react'

const File = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <a
        href="/documents/report.xlsx"
        target="_blank"
        rel="noopener noreferrer"
        className="excel-link"
      >
        📄 Open Excel Report
      </a>
    </div>
  )
}

export default File

