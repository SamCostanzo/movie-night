export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="conatiner max-w-6xl mx-auto min-h-screen px-4 py-12">{children}</div>;
}
