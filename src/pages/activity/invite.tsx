import { QrCode } from 'lucide-react';



function App() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 to-teal-50">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center min-h-screen">
        {/* Header Section */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-light tracking-widest text-gray-800 mb-2">
            INVITATION
          </h1>
          <h2 className="text-2xl font-medium text-gray-700">
            邀请函
          </h2>
        </div>

        {/* QR Code Section */}
        <div className="flex-grow flex flex-col items-center justify-center w-full max-w-xs">
          <button
            className="bg-white w-full aspect-square rounded-2xl shadow-lg p-6 mb-8 relative hover:shadow-xl transition-shadow"
          >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-rose-300"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-rose-300"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-rose-300"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-rose-300"></div>
            
            {/* QR Code placeholder */}
            <div className="w-full h-full flex items-center justify-center">
              <QrCode className="w-full h-full text-gray-800" />
            </div>
          </button>

          {/* Scan Instructions */}
          <div className="text-center">
            <p className="text-lg text-gray-600 font-medium">
              扫码登记
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="w-full max-w-xs mx-auto mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

export default App;