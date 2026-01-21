import WeeklyMenu from "./components/WeeklyMenu";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-black mb-6">Innehåll</h1>
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-lg font-semibold text-black mb-4">Kylskåpet</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                  🥛
                </div>
                <div>
                  <div className="font-medium text-black">Mjölk</div>
                  <div className="text-sm text-black">Utgår: 2026-01-28</div>
                </div>
              </div>
              <span className="text-xs text-blue-600 font-semibold">
                7 dagar
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                  🧀
                </div>
                <div>
                  <div className="font-medium text-black">Ost</div>
                  <div className="text-sm text-black">Utgår: 2026-02-10</div>
                </div>
              </div>
              <span className="text-xs text-green-600 font-semibold">
                20 dagar
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                  🥚
                </div>
                <div>
                  <div className="font-medium text-black">Ägg</div>
                  <div className="text-sm text-black">Utgår: 2026-01-25</div>
                </div>
              </div>
              <span className="text-xs text-yellow-600 font-semibold">
                4 dagar
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-black mb-2">
            Sammanfattning
          </h2>
          <p className="text-black mb-4">
            Du har 3 produkter i kylskåpet. 1 produkt utgår snart.
          </p>
          <div className="flex space-x-2">
            <div className="flex-1 bg-green-100 p-3 rounded text-center">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-xs text-black">Färska</div>
            </div>
            <div className="flex-1 bg-yellow-100 p-3 rounded text-center">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-xs text-black">Utgår snart</div>
            </div>
            <div className="flex-1 bg-red-100 p-3 rounded text-center">
              <div className="text-2xl font-bold text-red-600">0</div>
              <div className="text-xs text-black">Utgångna</div>
            </div>
          </div>
        </div>

        {/* Recipe suggestion */}
        <WeeklyMenu />
      </div>
    </div>
  );
}
