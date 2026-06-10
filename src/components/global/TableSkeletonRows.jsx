export function TableSkeletonRows({ rowsCount = 5 }) {
  return Array.from({ length: rowsCount }).map((_, idx) => (
    <tr key={`skeleton-${idx}`} className="animate-pulse border-b border-gray-50">
      {/* Checkbox Column */}
      <td className="py-4 px-5 text-center">
        <div className="w-4 h-4 bg-gray-200 rounded mx-auto"></div>
      </td>
      {/* No Column */}
      <td className="py-4 px-4">
        <div className="h-3 w-6 bg-gray-200 rounded"></div>
      </td>
      {/* User Name + Image Column */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-gray-200 rounded-full"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
      </td>
      {/* Email Column */}
      <td className="py-4 px-4">
        <div className="h-3 w-40 bg-gray-200 rounded"></div>
      </td>
      {/* Role Column */}
      <td className="py-4 px-4">
        <div className="h-3 w-16 bg-gray-200 rounded"></div>
      </td>
      {/* Status Column */}
      <td className="py-4 px-4 text-center">
        <div className="h-5 w-16 bg-gray-200 rounded-lg mx-auto"></div>
      </td>
      {/* Action Column */}
      <td className="py-4 px-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="w-7 h-7 bg-gray-200 rounded-xl"></div>
          <div className="w-7 h-7 bg-gray-200 rounded-lg"></div>
          <div className="w-7 h-7 bg-gray-200 rounded-lg"></div>
        </div>
      </td>
    </tr>
  ));
}
