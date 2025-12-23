export default function Card({
  title,
  value,
  subtitle,
  icon,
  valueColor = "text-gray-900",
  className = "",
  children,
}) {
  return (
    <div
      className={`
        bg-white
        border
        rounded-xl
        shadow-sm
        p-5
        flex
        items-center
        justify-between
        ${className}
      `}
    >
      <div>
        {title && (
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>
        )}

        {value !== undefined && (
          <p className={`mt-2 text-3xl font-semibold ${valueColor}`}>
            {value}
          </p>
        )}

        {subtitle && (
          <p className="text-xs text-gray-400 mt-1">
            {subtitle}
          </p>
        )}

        {children}
      </div>

      {icon && (
        <div className="text-2xl text-gray-400 ml-4">
          {icon}
        </div>
      )}
    </div>
  );
}