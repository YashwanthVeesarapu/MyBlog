"use client";

import Admin from "@/components/Admin";
import { AuthProvider, useAuth } from "@/components/AuthProvider";
import AuthLayout from "@/layouts/AuthLayout";
import { Suspense } from "react";

export default function page({ params }: any) {
  return (
    <AuthProvider>
      <AuthLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Admin />
        </Suspense>
      </AuthLayout>
    </AuthProvider>
  );
}
