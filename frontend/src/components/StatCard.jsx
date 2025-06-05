export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-gradient-to-tr from-pink-100 via-white to-blue-100 rounded-xl p-4 shadow flex items-center gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="text-gray-500 text-sm">{title}</h4>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  )
}