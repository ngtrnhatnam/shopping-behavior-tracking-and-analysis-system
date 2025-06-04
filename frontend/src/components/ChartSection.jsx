export default function ChartSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-xl p-4 shadow h-64 flex items-center justify-center">
        <p>📈 Line Chart (số lượt khách theo giờ)</p>
      </div>
      <div className="bg-white rounded-xl p-4 shadow h-64 flex items-center justify-center">
        <p>🥧 Pie Chart (tỉ lệ khách theo độ tuổi / giới tính)</p>
      </div>
    </div>
  )
}