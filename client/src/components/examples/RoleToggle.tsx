import { RoleToggle } from "../RoleToggle";
import { useState } from "react";

export default function RoleToggleExample() {
  const [role, setRole] = useState<"sdr" | "manager">("sdr");

  return (
    <div className="p-6 bg-background">
      <RoleToggle
        role={role}
        onToggle={() => {
          const newRole = role === "sdr" ? "manager" : "sdr";
          setRole(newRole);
          console.log("Role toggled to:", newRole);
        }}
        testId="role-toggle"
      />
    </div>
  );
}
