import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Client {
  coverageName: string;
  dataBTS: string[];
  dataCSM: string[];
  dataCE: string[];
}

interface ClientViewProps {
  client: Client | null;
}

const ClientView: React.FC<ClientViewProps> = ({ client }) => {
  const { clientId } = useParams();

  if (!client) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Client not found</h2>
        <p className="mt-2 text-gray-600">Please select a client from the dashboard.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{client.coverageName}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-blue-50 p-6 rounded-lg"
        >
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Data BTS</h2>
          <ul className="space-y-2">
            {client.dataBTS.map((person, index) => (
              <li key={index} className="text-blue-800">{person}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-green-50 p-6 rounded-lg"
        >
          <h2 className="text-xl font-semibold text-green-900 mb-4">Data CSM</h2>
          <ul className="space-y-2">
            {client.dataCSM.map((person, index) => (
              <li key={index} className="text-green-800">{person}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-purple-50 p-6 rounded-lg"
        >
          <h2 className="text-xl font-semibold text-purple-900 mb-4">Data CE</h2>
          <ul className="space-y-2">
            {client.dataCE.map((person, index) => (
              <li key={index} className="text-purple-800">{person}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ClientView; 