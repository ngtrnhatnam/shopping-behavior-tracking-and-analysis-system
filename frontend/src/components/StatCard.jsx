export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow flex items-center gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="text-gray-500 text-sm">{title}</h4>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  )
}