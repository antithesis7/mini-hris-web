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
      className={`bg-white border rounded-xl shadow-sm p-4 ${className}`}
    >
      {(title || icon) && (
        <div className="flex items-start justify-between">
          <div>
            {title && (
              <p className="text-sm font-medium text-gray-500">
                {title}
              </p>
            )}
            {subtitle && (
              <p className="text-xs text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {icon && (
            <div className="text-xl text-gray-400">
              {icon}
            </div>
          )}
        </div>
      )}

      {value && (
        <p
          className={`mt-3 text-3xl font-semibold ${valueColor}`}
        >
          {value}
        </p>
      )}

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}