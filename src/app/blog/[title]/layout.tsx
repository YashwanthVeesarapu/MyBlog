import MainLayout from "@/layouts/MainLayout";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      {children}

      <div className="glow"></div>
    </MainLayout>
  );
}
