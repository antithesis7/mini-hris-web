import Card from "../../Components/Ui/Card";

const VARIANT_CONFIG = {
  success: {
    valueColor: "text-green-600",
    icon: "✔",
  },
  warning: {
    valueColor: "text-yellow-600",
    icon: "⏰",
  },
  danger: {
    valueColor: "text-red-600",
    icon: "✖",
  },
  neutral: {
    valueColor: "text-gray-900",
    icon: null,
  },
};

export default function StatCard({
  title,
  value,
  variant = "neutral",
}) {
  const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.neutral;

  return (
    <Card
      title={title}
      value={value}
      valueColor={config.valueColor}
      icon={config.icon}
    />
  );
}