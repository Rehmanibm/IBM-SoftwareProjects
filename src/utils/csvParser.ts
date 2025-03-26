export interface Client {
  coverageName: string;
  dataBTS: string[];
  dataCSM: string[];
  dataCE: string[];
  clientSubType: string;
  leader: string;
  atlManager: string;
  tsr: string;
  atl: string;
  coverage: string;
}

export function parseCSVData(csvData: string): Client[] {
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const client: Client = {
      coverageName: values[1]?.trim() || '',
      clientSubType: values[2]?.trim() || '',
      leader: values[3]?.trim() || '',
      atlManager: values[4]?.trim() || '',
      tsr: values[5]?.trim() || '',
      atl: values[6]?.trim() || '',
      coverage: values[7]?.trim() || '',
      dataBTS: [
        values[8]?.trim() || '', // SLM
        values[9]?.trim() || '', // FLM
        values[10]?.trim() || '', // AI Assistants
        values[11]?.trim() || '', // AI/MLOps
        values[12]?.trim() || '', // Databases
        values[13]?.trim() || '', // Data Intelligence
        values[14]?.trim() || '', // Data Integration
        values[15]?.trim() || '', // Data Security
      ].filter(Boolean),
      dataCSM: [
        values[16]?.trim() || '', // SLM
        values[17]?.trim() || '', // FLM
        values[18]?.trim() || '', // AI Assistants
        values[19]?.trim() || '', // AI/ML Ops
        values[20]?.trim() || '', // Data
        values[21]?.trim() || '', // Security
      ].filter(Boolean),
      dataCE: [
        values[22]?.trim() || '', // SLM
        values[23]?.trim() || '', // FLM
      ].filter(Boolean),
    };
    return client;
  }).filter(client => client.coverageName); // Filter out empty rows
} 