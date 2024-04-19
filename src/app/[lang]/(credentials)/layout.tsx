
export const metadata = {
  title: "PsyPro",
  description: "Page description",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="grow">{children}</main>;
}
// menos claro: #F3F7FC - claro: #FAFBFF