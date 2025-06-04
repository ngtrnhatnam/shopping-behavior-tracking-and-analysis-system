export default function Header() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Trang chủ hệ thống</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm">Admin</span>
        <img src="/avatar.png" className="w-8 h-8 rounded-full" />
      </div>
    </header>
  )
}