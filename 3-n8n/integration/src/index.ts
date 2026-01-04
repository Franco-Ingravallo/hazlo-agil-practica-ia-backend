// src/index.ts
// Script de integración con Strapi API usando TypeScript

const STRAPI_BASE_URL = 'http://localhost:1337';
const STRAPI_TOKEN =
  '9d030e55ab140b829645cf1731cd38c17d72a0c1824d5298b668b31e419aabdd33c8aa8b812317b13f2a565ec8805b58adcaf5c02eedb260fbf256ceea4fbbe841e23c63c819c02cb35b22f1dec2778bcef6cdf0e49927d0e09a77c465f41b6faf633bb39b1d51af687f110231e644a2924f189f0020e645f0e7192841af90ac';

// Tipos de datos
interface AlertaData {
  id: number;
  documentId: string;
  cliente_id: string;
  tipo: string;
  urgencia: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ClienteData {
  id: number;
  documentId: string;
  Nombre: string;
  Correo: string;
  riesgo_fraude: boolean;
  saldo: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface MetricaData {
  id: number;
  documentId: string;
  Fecha: string;
  Valor: number;
  tipo: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ApiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Función para hacer requests a Strapi
async function fetchFromStrapi<T>(endpoint: string): Promise<T[]> {
  const url = `${STRAPI_BASE_URL}/api${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const jsonData = (await response.json()) as ApiResponse<T>;
    return jsonData.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

// Función para mostrar datos formateados
function displayData<T extends { id: number; documentId: string }>(
  title: string,
  data: T[]
): void {
  console.log('\n' + '='.repeat(60));
  console.log(`📊 ${title}`);
  console.log('='.repeat(60));

  if (data.length === 0) {
    console.log('❌ No hay datos disponibles');
    return;
  }

  data.forEach((item, index) => {
    console.log(`\n[${index + 1}] ID: ${item.id} | DocID: ${item.documentId}`);
    console.log(JSON.stringify(item, null, 2));
  });
}

// Función principal
async function main(): Promise<void> {
  console.log('🚀 Iniciando integración con Strapi...\n');

  try {
    // Obtener Alertas
    console.log('⏳ Obteniendo alertas...');
    const alertas = await fetchFromStrapi<AlertaData>('/alertas');
    displayData('ALERTAS', alertas);

    // Obtener Clientes
    console.log('\n⏳ Obteniendo clientes...');
    const clientes = await fetchFromStrapi<ClienteData>('/clientes');
    displayData('CLIENTES', clientes);

    // Obtener Métricas
    console.log('\n⏳ Obteniendo métricas...');
    const metricas = await fetchFromStrapi<MetricaData>('/metricas');
    displayData('MÉTRICAS', metricas);

    // Estadísticas
    console.log('\n' + '='.repeat(60));
    console.log('📈 RESUMEN');
    console.log('='.repeat(60));
    console.log(`✅ Alertas obtenidas: ${alertas.length}`);
    console.log(`✅ Clientes obtenidos: ${clientes.length}`);
    console.log(`✅ Métricas obtenidas: ${metricas.length}`);
    console.log('\n✨ Integración completada exitosamente!');
  } catch (error) {
    console.error('❌ Error en la integración:', error);
    process.exit(1);
  }
}

// Ejecutar
main();
