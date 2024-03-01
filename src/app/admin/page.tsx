"use client";

import Admin from "@/components/Admin";
import { AuthProvider, useAuth } from "@/components/AuthProvider";
import AuthLayout from "@/layouts/AuthLayout";

export default function page({ params }: any) {
  return (
    <AuthProvider>
      <AuthLayout>
        <Admin />
      </AuthLayout>
    </AuthProvider>
  );
}
