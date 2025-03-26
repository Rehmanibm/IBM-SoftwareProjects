import { useState } from 'react';
import { Client } from '../utils/excelParser';

interface SidebarProps {
  clients: Client[];
  selectedClient: Client | null;
  onClientSelect: (client: Client) => void;
  viewTitle: string;
}

function Sidebar({ clients, selectedClient, onClientSelect, viewTitle }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getLogoForCoverage = (coverageName: string) => {
    // Special case handling for known coverage names
    const specialCases: { [key: string]: string } = {
      'CANADA FEDERAL Core': 'CANADA-FEDERAL-Core.png',
      'CANADA FEDERAL Non Core': 'CANADA-FEDERAL-Non Core.png',
      'ROYAL BANK OF CANADA': 'ROYAL-BANK-OF-CANADA.jpg',
      'TORONTO DOMINION BANK': 'TORONTO-DOMINION-BANK.png',
      'SCOTIABANK': 'SCOTIABANK.png',
      'BANK OF MONTREAL': 'BANK-OF-MONTREAL.png',
      'CANADIAN IMPERIAL BANK COMMERCE': 'CANADIAN-IMPERIAL-BANK-COMMERCE.png',
      'GOVERNMENT ONTARIO': 'GOVERNMENT-ONTARIO.jpg',
      'BELL CANADA': 'BELL-CANADA.jpg',
      'GOVERNMENT QUEBEC': 'GOVERNMENT-QUEBEC.png',
      'CA - TSR - Lowes': 'LOWES.png',
      'CA - TSR - Bank Laurentian': 'BANK-LAURENTIAN.png',
      'CA - TSR - Intact Insurance': 'INTACT-INSURANCE.png',
      'CA - TSR - QUEBECOR': 'QUEBECOR.png',
      'CA - TSR - CNR': 'CNR.png',
      'CA - TSR - BOMBARDIER': 'BOMBARDIER.png',
      'CA - TSR - Empire Company (Sobeys)': 'SOBEYS.png',
      'CA - TSR - Enbridge': 'ENBRIDGE.png',
      'CA - TSR - GEORGE WESTON': 'GEORGE-WESTON.png',
      'CA - TSR - GOVERNMENT OF NOVA SCOTIA': 'GOVERNMENT-NOVA-SCOTIA.png',
      'CA - TSR - MANUFACTURERS LIFE (Manulife)': 'MANULIFE.png',
      'CA - TSR - MCCAIN Foods': 'MCCAIN-FOODS.png',
      'CA - TSR - Metro Richelieu': 'METRO-RICHELIEU.png',
      'CA - TSR - Nutrien': 'NUTRIEN.png',
      'CA - TSR - POWER CORP': 'POWER-CORP.png',
      'CA - TSR - ROGERS COMMUNICATIONS': 'ROGERS.png',
      'CA - TSR - SUN LIFE ASSURANCE': 'SUN-LIFE.png',
      'CA - TSR - WestJet Airlines': 'WESTJET.png',
      'CA - AB GOVERNMENT/MINISTRIES': 'ALBERTA-GOVERNMENT.png'
    };

    // Check if we have a special case
    if (specialCases[coverageName]) {
      return `/${specialCases[coverageName]}`;
    }

    // Default case: convert coverage name to match the logo filename format
    const logoFileName = coverageName
      .toUpperCase()
      .replace(/\s+/g, '-')
      .replace(/[^A-Z0-9-]/g, '');
    
    // Try different file extensions
    const extensions = ['.png', '.jpg', '.jpeg'];
    for (const ext of extensions) {
      const fileName = logoFileName + ext;
      return `/${fileName}`;
    }
    
    // Default to PNG if no specific file is found
    return `/${logoFileName}.png`;
  };

  const filteredClients = clients.filter(client =>
    client.coverageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.clientSubType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`relative bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-80'}`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors"
      >
        <svg
          className={`w-4 h-4 transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Sidebar Content */}
      <div className={`p-4 overflow-hidden ${isCollapsed ? 'hidden' : ''}`}>
        <h2 className="text-xl font-semibold mb-4">{viewTitle}</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          {filteredClients.map((client) => (
            <div
              key={client.coverageName}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedClient?.coverageName === client.coverageName
                  ? 'bg-blue-100 text-blue-800'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => onClientSelect(client)}
            >
              <div className="flex items-center gap-3">
                <img 
                  src={getLogoForCoverage(client.coverageName)}
                  alt={`${client.coverageName} Logo`}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    // If logo fails to load, hide the img element
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div>
                  <h3 className="font-medium">{client.coverageName}</h3>
                  <p className="text-sm text-gray-600">{client.clientSubType}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collapsed State Icon */}
      {isCollapsed && (
        <div className="flex items-center justify-center h-full">
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default Sidebar; 