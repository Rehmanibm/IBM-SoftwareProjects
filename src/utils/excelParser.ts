import * as XLSX from 'xlsx';

// Data Specialties and Sub-specialties
export type DataSpecialty = 'Data BTS' | 'Data CSM' | 'Data CE';
export type DataSubSpecialty =
  | 'Data BTS - SLM' | 'Data BTS - FLM' | 'Data BTS - AI Assistants' | 'Data BTS - AI/MLOps'
  | 'Data BTS - Databases' | 'Data BTS - Data Intelligence' | 'Data BTS - Data Integration'
  | 'Data BTS - Data Security' | 'Data CSM - SLM' | 'Data CSM - FLM' | 'Data CSM - AI Assistants'
  | 'Data CSM - AI/ML Ops' | 'Data CSM - Data' | 'Data CSM - Security' | 'Data CE - SLM' | 'Data CE - FLM';

// Automation Specialties and Sub-specialties
export type AutomationSpecialty = 'Auto BTS' | 'Auto CSM' | 'Auto CE';
export type AutomationSubSpecialty =
  | 'Auto BTS - SLM' | 'Auto BTS - FLM' | 'Auto BTS - App Development' | 'Auto BTS - App Integration'
  | 'Auto BTS - Network Mgmt' | 'Auto BTS - Identifty & Access Mgmt' | 'Auto BTS - IT Auto & FinOps'
  | 'Auto BTS - Asset LifeCycle Mgmt' | 'Auto CSM - SLM' | 'Auto CSM - FLM' | 'Auto CSM - Dev & App Integration'
  | 'Auto CSM - Infra Delivery' | 'Auto CSM - IT Auto & FinOps' | 'Auto CSM - Asset LifeCycle Mgmt'
  | 'Auto CE - SLM' | 'Auto CE - FLM';

// Infrastructure Specialties and Sub-specialties
export type InfrastructureSpecialty = 'Power & Cloud' | 'Cloud CSM' | 'Storage BTS' | 'Storage SME' | 'zStack BTS' | 'Z CSM';
export type InfrastructureSubSpecialty =
  | 'Power & Cloud - SLM' | 'Power & Cloud - FLM' | 'Power & Cloud - BTS' | 'Cloud CSM - SLM'
  | 'Cloud CSM - FLM' | 'Cloud CSM' | 'Storage BTS - SLM' | 'Storage BTS - FLM' | 'Storage BTS - Enterprise Storage'
  | 'Storage BTS - Data Resilience' | 'Storage BTS - Hybrid Cloud & AI' | 'Storage SME - Hyperscaler/H.Cloud&AI'
  | 'Storage SME - Data Resilience' | 'zStack BTS - FLM' | 'zStack BTS - zCA' | 'zStack BTS - zHW BTS'
  | 'zStack BTS - zSW Data' | 'zStack BTS - zSW Modernization' | 'zStack BTS - zSW AIOps / Security'
  | 'Z CSM - SLM' | 'Z CSM - ZTPS (WCA4Z, Test Acclerator for Z)';

export interface Client {
  coverageName: string;
  clientSubType: string;
  coverage: string;
  specialties: {
    [key: string]: {
      personnel: string[];
      subSpecialties: { [key: string]: string[] };
    };
  };
}

export interface ExcelData {
  data: Client[];
  automation: Client[];
  infrastructure: Client[];
}

const groupPersonnelBySpecialty = (row: any, subSpecialties: string[]): { [key: string]: { personnel: string[]; subSpecialties: { [key: string]: string[] } } } => {
  const result: { [key: string]: { personnel: string[]; subSpecialties: { [key: string]: string[] } } } = {};
  
  subSpecialties.forEach(subSpec => {
    const personnel = (row[subSpec] || '').toString().split(',').map((s: string) => s.trim()).filter(Boolean);
    const [specialty] = subSpec.split(' - ');
    
    if (!result[specialty]) {
      result[specialty] = {
        personnel: [],
        subSpecialties: {}
      };
    }

    if (personnel.length > 0) {
      result[specialty].subSpecialties[subSpec] = personnel;
      result[specialty].personnel = [...new Set([...result[specialty].personnel, ...personnel])];
    }
  });

  return result;
};

export function parseExcelData(excelData: ArrayBuffer): ExcelData {
  const workbook = XLSX.read(excelData, { type: 'array' });
  
  const parseWorksheet = (sheetName: string): Client[] => {
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
      console.error(`Sheet ${sheetName} not found`);
      return [];
    }

    const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
    if (jsonData.length === 0) {
      console.error(`No data found in sheet ${sheetName}`);
      return [];
    }

    // Log the column names for debugging
    console.log(`Sheet ${sheetName} columns:`, Object.keys(jsonData[0] || {}));

    return jsonData.map((row: any) => {
      let specialties;
      
      switch (sheetName) {
        case 'Data':
          const dataSubSpecialties = [
            'Data BTS - SLM', 'Data BTS - FLM', 'Data BTS - AI Assistants', 'Data BTS - AI/MLOps',
            'Data BTS - Databases', 'Data BTS - Data Intelligence', 'Data BTS - Data Integration',
            'Data BTS - Data Security', 'Data CSM - SLM', 'Data CSM - FLM', 'Data CSM - AI Assistants',
            'Data CSM - AI/ML Ops', 'Data CSM - Data', 'Data CSM - Security', 'Data CE - SLM', 'Data CE - FLM'
          ];
          specialties = groupPersonnelBySpecialty(row, dataSubSpecialties);
          break;

        case 'Automation':
          const autoSubSpecialties = [
            "Auto BTS - SLM", "Auto BTS - FLM", "Auto BTS - App Development", "Auto BTS - App Integration",
            "Auto BTS - Network Mgmt", "Auto BTS - Identifty & Access Mgmt", "Auto BTS - IT Auto & FinOps",
            "Auto BTS - Asset LifeCycle Mgmt", "Auto CSM - SLM", "Auto CSM - FLM", "Auto CSM - Dev & App Integration",
            "Auto CSM - Infra Delivery", "Auto CSM - IT Auto & FinOps", "Auto CSM - Asset LifeCycle Mgmt",
            "Auto CE - SLM", "Auto CE - FLM"
          ];
          specialties = groupPersonnelBySpecialty(row, autoSubSpecialties);
          break;

        case 'Infrastructure':
          const infraSubSpecialties = [
            "Power & Cloud - SLM", "Power & Cloud - FLM", "Power & Cloud - BTS", "Cloud CSM - SLM",
            "Cloud CSM - FLM", "Cloud CSM", "Storage BTS - SLM", "Storage BTS - FLM", "Storage BTS - Enterprise Storage",
            "Storage BTS - Data Resilience", "Storage BTS - Hybrid Cloud & AI", "Storage SME - Hyperscaler/H.Cloud&AI",
            "Storage SME - Data Resilience", "zStack BTS - FLM", "zStack BTS - zCA", "zStack BTS - zHW BTS",
            "zStack BTS - zSW Data", "zStack BTS - zSW Modernization", "zStack BTS - zSW AIOps / Security",
            "Z CSM - SLM", "Z CSM - ZTPS (WCA4Z, Test Acclerator for Z)"
          ];
          specialties = groupPersonnelBySpecialty(row, infraSubSpecialties);
          break;

        default:
          specialties = {};
      }

      return {
        coverageName: row['Coverage Name'] || row['CoverageName'] || '',
        clientSubType: row['Client Sub Type'] || row['ClientSubType'] || '',
        coverage: row['Coverage'] || '',
        specialties
      };
    });
  };

  return {
    data: parseWorksheet('Data'),
    automation: parseWorksheet('Automation'),
    infrastructure: parseWorksheet('Infrastructure')
  };
} 