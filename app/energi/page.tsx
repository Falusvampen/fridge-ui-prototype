export default function Energi() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Energi</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Energiförbrukning
            </h2>
            <p className="text-gray-600">
              Övervaka kylskåpets energiförbrukning.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Idag</div>
              <div className="text-2xl font-bold text-blue-600">0.8 kWh</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Denna vecka</div>
              <div className="text-2xl font-bold text-green-600">5.2 kWh</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Denna månad</div>
              <div className="text-2xl font-bold text-purple-600">21.5 kWh</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
