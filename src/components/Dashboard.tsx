import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import ClientDetails from './ClientDetails';
import { Client, ExcelData, parseExcelData } from '../utils/excelParser';

function Dashboard() {
  const location = useLocation();
  const currentView = location.pathname.split('/').pop() || 'data';
  const [excelData, setExcelData] = useState<ExcelData | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reset selected client when view changes
  useEffect(() => {
    setSelectedClient(null);
  }, [currentView]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Attempting to fetch Excel file...');
        const response = await fetch('/IBM-SoftwareProjects/2025IBMTechnologyCoverageData.xlsx');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        console.log('Converting response to array buffer...');
        const arrayBuffer = await response.arrayBuffer();
        console.log('Array buffer size:', arrayBuffer.byteLength);
        
        console.log('Parsing Excel data...');
        const parsedData = parseExcelData(arrayBuffer);
        console.log('Parsed data:', parsedData);
        
        setExcelData(parsedData);
        setError(null);
      } catch (error) {
        console.error('Detailed error:', error);
        setError(error instanceof Error ? error.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <img src="/IBMLOGO.svg" alt="IBM Logo" className="w-48 mb-8 animate-pulse" />
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <img src="/IBMLOGO.svg" alt="IBM Logo" className="w-48 mb-8" />
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-semibold mb-2">Error Loading Data</h2>
          <p>{error}</p>
          <p className="mt-4 text-sm text-gray-600">
            Please make sure the Excel file is in the public directory and named correctly.
          </p>
        </div>
      </div>
    );
  }

  if (!excelData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <img src="/IBMLOGO.svg" alt="IBM Logo" className="w-48 mb-8" />
        <div className="text-gray-500 text-center">
          <h2 className="text-xl font-semibold mb-2">No Data Available</h2>
          <p>Please check if the Excel file is properly loaded.</p>
        </div>
      </div>
    );
  }

  const getClientsForView = () => {
    switch (currentView) {
      case 'data':
        return excelData.data;
      case 'automation':
        return excelData.automation;
      case 'infrastructure':
        return excelData.infrastructure;
      default:
        return excelData.data;
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'data':
        return 'Data View';
      case 'automation':
        return 'Automation View';
      case 'infrastructure':
        return 'Infrastructure View';
      default:
        return 'Data View';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        clients={getClientsForView()}
        selectedClient={selectedClient}
        onClientSelect={setSelectedClient}
        viewTitle={getViewTitle()}
      />
      <main className="flex-1 overflow-y-auto">
        {selectedClient ? (
          <ClientDetails client={selectedClient} view={currentView} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-8">
            <div className="mb-12">
              <img 
                src="/IBMLOGO.svg" 
                alt="IBM Logo" 
                className="w-48 mb-8"
              />
            </div>
            <div className="text-gray-800 text-center">
              <h1 className="text-3xl font-bold mb-4">Welcome to IBM Technology Coverage Dashboard</h1>
              <p className="text-xl text-gray-600 mb-8">Select a client from the sidebar to view their coverage details</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard; 