
import React, { useState } from 'react';
import { X, Copy, Download, Upload, Check } from 'lucide-react';

interface DataSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  startDate: Date | null;
  completedDays: string[];
  onImport: (startDate: Date, completedDays: string[]) => void;
}

export const DataSyncModal: React.FC<DataSyncModalProps> = ({ 
  isOpen, 
  onClose, 
  startDate, 
  completedDays,
  onImport
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [importCode, setImportCode] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Generate code
  const generateExportCode = () => {
    if (!startDate) return '';
    const data = {
      s: startDate.toISOString(),
      c: completedDays
    };
    try {
      return btoa(JSON.stringify(data));
    } catch (e) {
      return 'Error generating code';
    }
  };

  const exportCode = generateExportCode();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleImport = () => {
    setError(null);
    try {
      if (!importCode.trim()) {
        setError("Wklej kod przed załadowaniem.");
        return;
      }
      
      const jsonString = atob(importCode.trim());
      const data = JSON.parse(jsonString);

      if (!data.s || !Array.isArray(data.c)) {
        throw new Error("Nieprawidłowy format danych");
      }

      const newDate = new Date(data.s);
      if (isNaN(newDate.getTime())) {
        throw new Error("Nieprawidłowa data");
      }

      onImport(newDate, data.c);
      onClose();
      alert("Dane załadowane pomyślnie!");
      
    } catch (e) {
      setError("Nieprawidłowy kod. Sprawdź czy skopiowałeś całość.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full shadow-2xl relative border border-gray-100 dark:border-slate-800" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Synchronizacja</h3>

        <div className="flex border-b border-gray-200 dark:border-slate-800 mb-6">
          <button
            className={`flex-1 pb-3 font-medium text-sm transition-colors ${activeTab === 'export' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
            onClick={() => setActiveTab('export')}
          >
            <span className="flex items-center justify-center gap-2">
               <Upload size={16} /> Eksportuj (Zapisz)
            </span>
          </button>
          <button
            className={`flex-1 pb-3 font-medium text-sm transition-colors ${activeTab === 'import' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
            onClick={() => setActiveTab('import')}
          >
             <span className="flex items-center justify-center gap-2">
               <Download size={16} /> Importuj (Wczytaj)
            </span>
          </button>
        </div>

        {activeTab === 'export' ? (
          <div>
            <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">
              Skopiuj ten kod i wklej go na innym urządzeniu, aby przenieść swój postęp.
            </p>
            <div className="relative">
              <textarea
                readOnly
                value={exportCode}
                className="w-full h-32 p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-xs font-mono text-gray-600 dark:text-slate-300 resize-none focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="absolute bottom-2 right-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-200 px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all"
              >
                {copySuccess ? <Check size={14} className="text-emerald-500"/> : <Copy size={14} />}
                {copySuccess ? "Skopiowano!" : "Kopiuj"}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">
              Wklej kod wygenerowany na innym urządzeniu.
              <br/>
              <span className="text-red-500 dark:text-red-400 text-xs font-bold">Uwaga: To nadpisze obecny postęp na tym urządzeniu!</span>
            </p>
            <textarea
              value={importCode}
              onChange={(e) => setImportCode(e.target.value)}
              placeholder="Wklej kod tutaj..."
              className="w-full h-32 p-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-xs font-mono text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary focus:border-primary outline-none mb-4"
            />
            
            {error && (
              <p className="text-red-500 dark:text-red-400 text-xs mb-4">{error}</p>
            )}

            <button
              onClick={handleImport}
              className="w-full bg-primary hover:bg-sky-600 text-white py-3 rounded-lg font-bold shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Załaduj Dane
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
