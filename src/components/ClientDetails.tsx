import { useState } from 'react';
import { Client } from '../utils/excelParser';

interface ClientDetailsProps {
  client: Client;
  view: string;
}

export default function ClientDetails({ client, view }: ClientDetailsProps) {
  const [expandedSpecialties, setExpandedSpecialties] = useState<Set<string>>(new Set());

  const toggleSpecialty = (specialty: string) => {
    const newExpanded = new Set(expandedSpecialties);
    if (newExpanded.has(specialty)) {
      newExpanded.delete(specialty);
    } else {
      newExpanded.add(specialty);
    }
    setExpandedSpecialties(newExpanded);
  };

  const getSpecialtiesForView = () => {
    switch (view) {
      case 'data':
        return Object.entries(client.specialties).filter(([key]) => 
          key.startsWith('Data')
        );
      case 'automation':
        return Object.entries(client.specialties).filter(([key]) => 
          key.startsWith('Auto')
        );
      case 'infrastructure':
        return Object.entries(client.specialties).filter(([key]) => 
          key.startsWith('Power & Cloud') || key.startsWith('Cloud CSM') || 
          key.startsWith('Storage') || key.startsWith('zStack') || key.startsWith('Z CSM')
        );
      default:
        return [];
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{client.coverageName}</h2>
        <div className="text-sm text-gray-600">
          <p>Client Sub Type: {client.clientSubType}</p>
          <p>Coverage: {client.coverage}</p>
        </div>
      </div>

      <div className="space-y-4">
        {getSpecialtiesForView().map(([specialty, data]) => (
          <div key={specialty} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSpecialty(specialty)}
              className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
            >
              <span className="font-semibold text-gray-700">{specialty}</span>
              <span className="text-gray-500">
                {expandedSpecialties.has(specialty) ? '▼' : '▶'}
              </span>
            </button>
            
            {expandedSpecialties.has(specialty) && (
              <div className="p-4 bg-white">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Personnel</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.personnel.map((person, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {person}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Sub-specialties</h3>
                  <div className="space-y-3">
                    {Object.entries(data.subSpecialties).map(([subSpecialty, personnel]) => (
                      <div key={subSpecialty} className="border-l-2 border-gray-200 pl-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">{subSpecialty}</h4>
                        <div className="flex flex-wrap gap-2">
                          {personnel.map((person, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                            >
                              {person}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 