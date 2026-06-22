import React from 'react'

function DropDownLoader() {
  return (
<div className="absolute right-10 top-[13px] flex items-center justify-center pointer-events-none">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-black"></div>
              </div>  )
}

export default DropDownLoader