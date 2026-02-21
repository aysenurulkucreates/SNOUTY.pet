interface UserData {
  occupation?: string;
  description?: string;
  city?: string;
}

interface StyleProps {
  bg: string;
  color: string;
  icon: string;
}

const ProfileTag = ({ data }: { data: UserData }) => {
  const tagStyles: Record<string, StyleProps> = {
    description: { bg: "#d1e7dd", color: "#0a3622", icon: "✏️" },
    occupation: { bg: "#cfe2ff", color: "#084298", icon: "🌸" },
    city: { bg: "#e2d9f3", color: "#311432", icon: "📍" },
  };

  return (
    <div
      style={{
        marginTop: "10px",
        display: "flex",
        gap: "5px",
        flexWrap: "wrap",
      }}
    >
      {Object.entries(data).map(
        ([key, value]) =>
          value && (
            <span
              key={key}
              style={{
                background: tagStyles[key]?.bg || "#eee",
                color: tagStyles[key]?.color || "#333",
                padding: "5px 10px",
                borderRadius: "15px",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {tagStyles[key]?.icon} {value}
            </span>
          ),
      )}
    </div>
  );
};

export default ProfileTag;
