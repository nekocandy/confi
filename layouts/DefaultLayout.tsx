
export default function DefaultLayout({ children }) {
  return (
    <div className="bg-zinc-900">
      <main>{children}</main>
    </div>
  )
}