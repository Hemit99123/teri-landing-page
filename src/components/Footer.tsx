import React from 'react'

const Footer = () => {
  return (
    <div>
        <div className="mt-8 mb-8 pt-8 border-t border-gray-800 text-center">
        <p>&copy; {new Date().getFullYear()} DEI360. All rights reserved.</p>
        </div>
    </div>  
  )
}

export default Footer