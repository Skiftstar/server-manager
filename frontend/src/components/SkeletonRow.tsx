function SkeletonRow() {
  return (
    <tr className="border-b border-gray-900">
      <td className="py-3 px-1">
        <div className="h-3 w-20 rounded bg-white/5 animate-pulse" />
      </td>
      <td className="py-3 px-1">
        <div className="h-3 w-28 rounded bg-white/5 animate-pulse" />
      </td>
      <td className="py-3 px-1">
        <div className="h-3 w-48 rounded bg-white/5 animate-pulse" />
      </td>
      <td className="py-3 px-1">
        <div className="h-3 w-32 rounded bg-white/5 animate-pulse" />
      </td>
      <td className="py-3 px-1">
        <div className="h-3 w-20 rounded bg-white/5 animate-pulse" />
      </td>
      <td className="py-3 px-1">
        <div className="h-4 w-16 rounded-full bg-white/5 animate-pulse" />
      </td>
      <td className="py-3 px-1">
        <div className="h-3 w-24 ml-auto rounded bg-white/5 animate-pulse" />
      </td>
    </tr>
  );
}

export default SkeletonRow;
