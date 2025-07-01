'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminProtectedLayout({ children }) {
  const router = useRouter();
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const role = localStorage.getItem("admin_role");

    if (!token || role !== "admin") {
      router.replace("/admin"); // immediate redirect
      toast.error("You must be logged in as admin");
    } else {
      setCheckedAuth(true);
    }
  }, [router]);

  // Don't render anything until we confirm auth status
  if (!checkedAuth) return null;

  return children;
}
