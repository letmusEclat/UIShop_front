import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL']! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed...');

  // ─── Centros de estudio ───────────────────────────────────────────
  const [ceis, ceiq, ceim] = await Promise.all([
    prisma.studyCenter.upsert({
      where: { id: 1 },
      update: {
        name: 'Centro de Estudios de Ingeniería de Sistemas',
        description: 'Espacio académico del programa de Ingeniería de Sistemas orientado al apoyo en programación, bases de datos, redes y desarrollo de software.',
        location: 'CEIS — Edificio E, Ciudad Universitaria UIS',
        logoUrl: '/uploads/ing-sistemas.png',
      },
      create: {
        name: 'Centro de Estudios de Ingeniería de Sistemas',
        description: 'Espacio académico del programa de Ingeniería de Sistemas orientado al apoyo en programación, bases de datos, redes y desarrollo de software.',
        location: 'CEIS — Edificio E, Ciudad Universitaria UIS',
        logoUrl: '/uploads/ing-sistemas.png',
      },
    }),
    prisma.studyCenter.upsert({
      where: { id: 2 },
      update: {
        name: 'Centro de Estudios de Ingeniería Química',
        description: 'Centro de consulta y apoyo académico para estudiantes de Ingeniería Química, con recursos especializados en fisicoquímica, termodinámica y procesos industriales.',
        location: 'CEIQ — Edificio D, Ciudad Universitaria UIS',
        logoUrl: '/uploads/ing-quimica.png',
      },
      create: {
        name: 'Centro de Estudios de Ingeniería Química',
        description: 'Centro de consulta y apoyo académico para estudiantes de Ingeniería Química, con recursos especializados en fisicoquímica, termodinámica y procesos industriales.',
        location: 'CEIQ — Edificio D, Ciudad Universitaria UIS',
        logoUrl: '/uploads/ing-quimica.png',
      },
    }),
    prisma.studyCenter.upsert({
      where: { id: 3 },
      update: {
        name: 'Centro de Estudios de Ingeniería Mecánica',
        description: 'Centro académico de Ingeniería Mecánica con énfasis en diseño de máquinas, materiales, manufactura y termodinámica aplicada.',
        location: 'CEIM — Edificio F, Ciudad Universitaria UIS',
        logoUrl: '/uploads/ing-mecanica.png',
      },
      create: {
        name: 'Centro de Estudios de Ingeniería Mecánica',
        description: 'Centro académico de Ingeniería Mecánica con énfasis en diseño de máquinas, materiales, manufactura y termodinámica aplicada.',
        location: 'CEIM — Edificio F, Ciudad Universitaria UIS',
        logoUrl: '/uploads/ing-mecanica.png',
      },
    }),
  ]);

  // Centros adicionales
  await prisma.studyCenter.upsert({
    where: { id: 4 },
    update: {
      name: 'Centro de Estudios de Ingeniería Civil',
      description: 'Centro de apoyo académico para Ingeniería Civil con énfasis en estructuras, hidráulica, geotecnia y materiales de construcción.',
      location: 'CEIC — Edificio G, Ciudad Universitaria UIS',
      logoUrl: '/uploads/ing-civil.png',
    },
    create: {
      name: 'Centro de Estudios de Ingeniería Civil',
      description: 'Centro de apoyo académico para Ingeniería Civil con énfasis en estructuras, hidráulica, geotecnia y materiales de construcción.',
      location: 'CEIC — Edificio G, Ciudad Universitaria UIS',
      logoUrl: '/uploads/ing-civil.png',
    },
  });

  await prisma.studyCenter.upsert({
    where: { id: 5 },
    update: {
      name: 'Centro de Estudios de Geología',
      description: 'Centro académico del programa de Geología, con apoyo en mineralogía, paleontología, geofísica y recursos del subsuelo.',
      location: 'CEGeo — Edificio C, Ciudad Universitaria UIS',
      logoUrl: '/uploads/geologia.png',
    },
    create: {
      name: 'Centro de Estudios de Geología',
      description: 'Centro académico del programa de Geología, con apoyo en mineralogía, paleontología, geofísica y recursos del subsuelo.',
      location: 'CEGeo — Edificio C, Ciudad Universitaria UIS',
      logoUrl: '/uploads/geologia.png',
    },
  });

  await prisma.studyCenter.upsert({
    where: { id: 6 },
    update: {
      name: 'Centro de Estudios de Derecho y Ciencias Políticas',
      description: 'Centro académico de la Escuela de Derecho y Ciencias Políticas UIS, con recursos en jurisprudencia, derecho constitucional y ciencias políticas.',
      location: 'CEDCP — Edificio A, Ciudad Universitaria UIS',
      logoUrl: '/uploads/derecho.png',
    },
    create: {
      name: 'Centro de Estudios de Derecho y Ciencias Políticas',
      description: 'Centro académico de la Escuela de Derecho y Ciencias Políticas UIS, con recursos en jurisprudencia, derecho constitucional y ciencias políticas.',
      location: 'CEDCP — Edificio A, Ciudad Universitaria UIS',
      logoUrl: '/uploads/derecho.png',
    },
  });

  console.log(' Centros de estudio creados');

  // ─── Vendedores ───────────────────────────────────────────────────
  const hash = (pw: string) => bcrypt.hash(pw, 10);

  const [vendedor1, vendedor2] = await Promise.all([
    prisma.user.upsert({
      where: { email: 'tiendauis@correo.uis.edu.co' },
      update: {},
      create: {
        email: 'tiendauis@correo.uis.edu.co',
        passwordHash: await hash('vendedor123'),
        fullName: 'Tienda UIS Oficial',
        role: 'SELLER',
        isVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'papeleria.norte@correo.uis.edu.co' },
      update: {},
      create: {
        email: 'papeleria.norte@correo.uis.edu.co',
        passwordHash: await hash('vendedor123'),
        fullName: 'Papelería del Norte',
        role: 'SELLER',
        isVerified: true,
      },
    }),
  ]);

  console.log('Vendedores creados');

  // ─── Comprador de prueba ──────────────────────────────────────────
  await prisma.user.upsert({
    where: { email: 'estudiante@correo.uis.edu.co' },
    update: {},
    create: {
      email: 'estudiante@correo.uis.edu.co',
      passwordHash: await hash('estudiante123'),
      fullName: 'Estudiante UIS',
      role: 'BUYER',
    },
  });

  console.log('Comprador de prueba creado');

  // ─── Productos ────────────────────────────────────────────────────
  const productos = [
    // ── Comidas ──────────────────────────────────────────────────────
    {
      title: 'Bandeja Paisa completa',
      description: 'Bandeja paisa tradicional con frijoles, chicharrón, chorizo, huevo, arroz blanco, hogao y aguacate. El plato más completo del campus.',
      price: 14000,
      tags: ['comida', 'almuerzo'],
      imageUrl: '/uploads/almuerzo.jpg',
      sellerId: vendedor1.id,
      studyCenterId: null,
    },
    {
      title: 'Arrocito Porky',
      description: 'Arroz achotado con raíces chinas, mix de zanahoria y pimentón en juliana, lomo de cerdo, chips de yuca, chorizo y maduritos. Menú del día Bowie.',
      price: 12000,
      tags: ['comida', 'almuerzo'],
      imageUrl: '/uploads/almuerz02.jpg',
      sellerId: vendedor1.id,
      studyCenterId: null,
    },
    {
      title: 'Morcilla con patacones',
      description: 'Porción de morcilla asada servida con patacones crocantes. Antojo típico colombiano para cualquier hora.',
      price: 10000,
      tags: ['comida', 'snack'],
      imageUrl: '/uploads/comida1.jpg',
      sellerId: vendedor1.id,
      studyCenterId: null,
    },
    {
      title: 'Sándwich artesanal de pollo',
      description: 'Sándwich en pan tajado con pollo desmenuzado, jamón, queso, lechuga y mayonesa. Hecho en el momento, ideal para el descanso.',
      price: 8000,
      tags: ['comida', 'snack'],
      imageUrl: '/uploads/comida2.jpg',
      sellerId: vendedor1.id,
      studyCenterId: null,
    },
    {
      title: 'Sándwich submarino + limonada',
      description: 'Pan baguette con atún, lechuga, tomate y mayonesa, acompañado de limonada natural fría. Combo perfecto para estudiar.',
      price: 12000,
      tags: ['comida', 'snack'],
      imageUrl: '/uploads/ensaladas.jpg',
      sellerId: vendedor1.id,
      studyCenterId: null,
    },
    {
      title: 'Empanadas de pipián x6',
      description: 'Seis empanadas de pipián fritas, crujientes por fuera y con relleno de papa criolla y maní. La merienda clásica de la UIS.',
      price: 9000,
      tags: ['comida', 'snack'],
      imageUrl: '/uploads/emoanadas.jpg',
      sellerId: vendedor1.id,
      studyCenterId: null,
    },
    {
      title: 'Ensalada costeña de frutas',
      description: 'Mix de frutas frescas (uvas, kiwi, aguacate) con limón y sal. Refrescante y saludable para el entre clases.',
      price: 5000,
      tags: ['comida', 'saludable'],
      imageUrl: '/uploads/comida3.jpg',
      sellerId: vendedor1.id,
      studyCenterId: null,
    },
    {
      title: 'Chontaduro con sal y limón',
      description: 'Palitos de chontaduro y mango con sal, limón y ají. El snack más popular de los pasillos de la UIS.',
      price: 4000,
      tags: ['comida', 'snack'],
      imageUrl: '/uploads/ensalada.jpg',
      sellerId: vendedor1.id,
      studyCenterId: null,
    },
    // ── Bebidas ───────────────────────────────────────────────────────
    {
      title: 'Frapé Oreo — Cero Absoluto',
      description: 'Frapé frío de café con crema chantilly y galleta Oreo molida. Presentación de Cero Absoluto -273°C, el mejor del campus.',
      price: 7000,
      tags: ['bebida', 'comida'],
      imageUrl: '/uploads/bebida1.jpg',
      sellerId: vendedor1.id,
      studyCenterId: null,
    },
    {
      title: 'Salpicón Monster Ice',
      description: 'Salpicón de frutas en hielo raspado de fresa y mango, decorado con gomitas y ají. Refrescante y colorido.',
      price: 5000,
      tags: ['bebida', 'comida'],
      imageUrl: '/uploads/bebida2.jpg',
      sellerId: vendedor1.id,
      studyCenterId: null,
    },
    {
      title: 'Sorbete de mango natural',
      description: 'Sorbete de mango biche batido en blender Ninja, servido en vaso grande con mango en cubos encima. 100% natural.',
      price: 6000,
      tags: ['bebida', 'comida'],
      imageUrl: '/uploads/bebida3.jpg',
      sellerId: vendedor1.id,
      studyCenterId: null,
    },
    {
      title: 'Jugo de naranja natural',
      description: 'Jugo de naranja exprimido en vaso sellado, ideal para llevar al salón. Sin azúcar añadida, fresco y vitamínico.',
      price: 3000,
      tags: ['bebida', 'comida'],
      imageUrl: '/uploads/bebida4.jpg',
      sellerId: vendedor1.id,
      studyCenterId: null,
    },
    {
      title: 'Café de garbanzo 250g',
      description: 'Café de garbanzo tostado y molido, 100% natural, sin cafeína. Rico en fibra y proteínas. Sabor suave, ideal para estudiar de noche.',
      price: 18000,
      tags: ['bebida', 'saludable'],
      imageUrl: '/uploads/cafe.jpg',
      sellerId: vendedor1.id,
      studyCenterId: ceiq.id,
    },
    // ── Papelería y libros ────────────────────────────────────────────
    {
      title: 'Cuaderno kawaii Bobbie Goods',
      description: 'Cuaderno espiral temático de Bobbie Goods, diseño ilustrado de oso con fresa, pasta dura y páginas blancas. Edición limitada.',
      price: 18000,
      tags: ['útiles', 'papelería'],
      imageUrl: '/uploads/articulos1.jpg',
      sellerId: vendedor2.id,
      studyCenterId: ceis.id,
    },
    {
      title: 'Álbum Panini FIFA World Cup 2026',
      description: 'Álbum oficial de la colección de stickers Panini para el Mundial 2026. Edición exclusiva para Colombia. Precio referencia $15.000.',
      price: 15000,
      tags: ['libros', 'coleccionable'],
      imageUrl: '/uploads/articulo5.jpg',
      sellerId: vendedor2.id,
      studyCenterId: null,
    },
    {
      title: 'Lote de libros segunda mano',
      description: 'Selección de libros en buen estado: El Principito, Harry Potter, cuentos infantiles y más. Ideal para intercambio o regalo.',
      price: 8000,
      tags: ['libros'],
      imageUrl: '/uploads/articulo6.jpg',
      sellerId: vendedor2.id,
      studyCenterId: ceis.id,
    },
    // ── Accesorios y belleza ──────────────────────────────────────────
    {
      title: 'Eyebrow Pen Trendy',
      description: 'Delineador de cejas Trendy by Camila Valles, punta ultrafina para trazos precisos. Resistente al agua, larga duración. x2 unidades.',
      price: 25000,
      tags: ['accesorios', 'belleza'],
      imageUrl: '/uploads/articulo4.jpg',
      sellerId: vendedor2.id,
      studyCenterId: null,
    },
    {
      title: 'Moñas flores holográficas x3',
      description: 'Set de 3 moñas tipo garra con forma de flor en colores holográficos: lila, rosa y naranja. Accesorio de moda para el cabello.',
      price: 15000,
      tags: ['accesorios', 'belleza'],
      imageUrl: '/uploads/articulos2.jpg',
      sellerId: vendedor2.id,
      studyCenterId: null,
    },
    {
      title: 'Calcetines tejidos acanalados',
      description: 'Pack de calcetines de punto acanalado en tonos neutros: negro, café, beige y crema. Suaves, abrigados y estilo coreano.',
      price: 22000,
      tags: ['ropa', 'accesorios'],
      imageUrl: '/uploads/articulos3.jpg',
      sellerId: vendedor2.id,
      studyCenterId: null,
    },
    // ── Servicios ─────────────────────────────────────────────────────
    {
      title: 'Tutoría académica personalizada',
      description: 'Sesión de tutoría de 1 hora con estudiante monitor certificado. Áreas: cálculo, física, programación, química. Reserva por mensaje.',
      price: 30000,
      tags: ['servicios'],
      imageUrl: '/uploads/banner redes1.jpg',
      sellerId: vendedor2.id,
      studyCenterId: ceis.id,
    },
  ];

  for (const p of productos) {
    await prisma.product.create({
      data: {
        title: p.title,
        description: p.description,
        price: p.price,
        tags: p.tags,
        imageUrl: p.imageUrl,
        isActive: true,
        sellerId: p.sellerId,
        ...(p.studyCenterId != null ? { studyCenterId: p.studyCenterId } : {}),
      },
    });
  }

  console.log(`✅ ${productos.length} productos creados`);
  console.log('\n Seed completado exitosamente');
  console.log('\n Cuentas disponibles:');
  console.log('   Comprador → estudiante@correo.uis.edu.co / estudiante123');
  console.log('   Vendedor1 → tiendauis@correo.uis.edu.co / vendedor123');
  console.log('   Vendedor2 → papeleria.norte@correo.uis.edu.co / vendedor123');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

