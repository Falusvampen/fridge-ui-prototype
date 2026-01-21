export default function Inkopslista() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Inköpslista</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Här kan du hantera din inköpslista för kylskåpet.
          </p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
              <input type="checkbox" className="w-5 h-5" />
              <span className="text-gray-700">Mjölk</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
              <input type="checkbox" className="w-5 h-5" />
              <span className="text-gray-700">Ägg</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
              <input type="checkbox" className="w-5 h-5" />
              <span className="text-gray-700">Smör</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
